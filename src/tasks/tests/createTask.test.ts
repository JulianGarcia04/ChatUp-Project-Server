import { describe, expect, test, beforeEach } from '@jest/globals';
import { RepositorysMockFns, mapperToDomain } from './mocks';
import { MockClass } from 'common/mocks';
import {
  type IOneTask,
  type ICreateTask,
} from 'tasks/application/repositories/ITaskRepository';
import { CreateTask } from 'tasks/application/useCases';
import { CantBeSaved, TaskIsDuplicate } from 'tasks/application/exceptions';
import { MessageImplementation } from 'common/implementations';
import { type toDomain } from 'common';
import { type ITask } from 'tasks/domain';

// mapper mock class
const ToDomain = MockClass(
  ['execute'],
  [(task: ITask) => mapperToDomain(task)],
);

const toDomainImplementation = new ToDomain() as toDomain<ITask>;

// repositoryFns
const repositoryMock = new RepositorysMockFns(toDomainImplementation);

// before each function
beforeEach(() => {
  repositoryMock.tasks = [];
  repositoryMock.tasks.push({
    id: 1,
    title: 'Hola mundo',
    description: 'mi primer hola mundo',
    isReady: false,
    isDelete: false,
  });
});

// Create task mock
const CreateTaskMock = MockClass(
  ['save'],
  [
    async (props: ITask): Promise<void> => {
      await repositoryMock.createFn(props);
    },
  ],
);
// Create task mock faile
const CreateTaskMockFaile = MockClass(
  ['save'],
  [async (props: ITask): Promise<void> => {}],
);
// find the task as id
const OneTaskMock = MockClass(
  ['withId'],
  [async (id: string | number) => await repositoryMock.findFn(id)],
);

describe('tests create task usecase', () => {
  const createTask = new CreateTaskMock() as ICreateTask;
  const createTaskFaile = new CreateTaskMockFaile() as ICreateTask;
  const oneTask = new OneTaskMock() as IOneTask;
  test('test when the task is on the database, where I give the function to the repeat params then must return a error', async () => {
    const createTaskUseCase = new CreateTask(createTask, oneTask);
    const props: ITask = {
      id: 1,
      title: 'Hola mundo',
      description: 'mi primer hola mundo',
      isReady: false,
      isDelete: false,
    };

    const executeFn = createTaskUseCase.execute(props);
    await expect(executeFn).rejects.toBeInstanceOf(TaskIsDuplicate);
  });

  test('test check that the object be saved in the database correctly, where I give the faile mock function then return error', async () => {
    const createTaskUseCase = new CreateTask(createTaskFaile, oneTask);
    const props = {
      id: 3,
      title: 'mi tercero hola mundo',
      description: 'saludo tres veces',
      isReady: false,
      isDelete: false,
    };

    const executeFn = createTaskUseCase.execute(props);

    await expect(executeFn).rejects.toBeInstanceOf(CantBeSaved);
  });

  test('test when finished the usecase must return a message', async () => {
    const createTaskUseCase = new CreateTask(createTask, oneTask);
    const props = {
      id: 3,
      title: 'mi tercero hola mundo',
      description: 'saludo tres veces',
      isReady: false,
      isDelete: false,
    };

    const executeFn = await createTaskUseCase.execute(props);

    expect(executeFn).toBeInstanceOf(MessageImplementation);
  });
});
