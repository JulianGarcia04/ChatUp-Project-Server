import { describe, expect, test, beforeEach } from '@jest/globals';
import { RepositorysMockFns, mapperToDomain } from '../mocks';
import { MockClass } from 'common/mocks';
import {
  type IOneTask,
  type IEditTask,
} from 'tasks/application/repositories/ITaskRepository';
import { TaskNotFound, CantDeleteTask } from 'tasks/application/exceptions';
import { MessageImplementation } from 'common/domain/implementations';
import { DeleteTask } from 'tasks/application/useCases';
import { type toModel } from 'src/common';
import { type ITask } from 'tasks/domain';
import { type DTO } from 'tasks/application/useCases/deleteTask/DTO';

// mapper mock class
const ToDomain = MockClass(
  ['execute'],
  [(task: ITask) => mapperToDomain(task)],
);

const toDomainImplementation = new ToDomain() as toModel<ITask, ITask>;

// repositoryFns
const repositoryMock = new RepositorysMockFns(toDomainImplementation);

const OneTaskMock = MockClass(
  ['withId'],
  [async (id: string | number) => await repositoryMock.findFn(id)],
);
const EditTaskMock = MockClass(
  ['withId'],
  [
    async (id: string | number, props: unknown) => {
      await repositoryMock.editFn(id, props);
    },
  ],
);
const EditTaskMockFaile = MockClass(
  ['withId'],
  [
    async (id: number | string, props: unknown): Promise<void> => {
      const idx = repositoryMock.tasks.findIndex(task => task.id === id);
      const mergeData = {
        ...repositoryMock.tasks[idx],
      };
      repositoryMock.tasks[idx] = mergeData;
    },
  ],
);

// before each function
beforeEach(() => {
  repositoryMock.tasks = [];
  repositoryMock.tasks.push({
    id: 1,
    title: 'Hola mundo',
    description: 'mi primer hola mundo',
    isReady: false,
    isDelete: false,
    createdDate: new Date(Date.now()),
  });
});

describe('test the delete task usecase', () => {
  const oneTask = new OneTaskMock() as IOneTask;
  const editTask = new EditTaskMock() as IEditTask;
  const editTaskFaile = new EditTaskMockFaile() as IEditTask;

  test('test when the task dont exists, I going to give the params with id is a code that doesnt exits, then must return error', async () => {
    const changeStateUseCase = new DeleteTask(oneTask, editTask);
    const props: DTO = { id: 3 };

    const executeFn = changeStateUseCase.execute(props);

    await expect(executeFn).rejects.toBeInstanceOf(TaskNotFound);
  });

  test('test when the task cant delete, I going to give the isDelete param in true but mustnt update but the repository dont update the isDelete prop, thene must return a error', async () => {
    const changeStateUseCase = new DeleteTask(oneTask, editTaskFaile);
    const props = { id: 1 };

    const executeFn = changeStateUseCase.execute(props);

    await expect(executeFn).rejects.toBeInstanceOf(CantDeleteTask);
  });

  test('test when change the state in the task, I going to give the params for that want change the state, must return a confirm message', async () => {
    const changeStateUseCase = new DeleteTask(oneTask, editTask);
    const props: DTO = { id: 1 };

    const executeFn = await changeStateUseCase.execute(props);
    expect(executeFn).toBeInstanceOf(MessageImplementation);
  });
});
