import { describe, expect, test, beforeEach } from '@jest/globals';
import { RepositorysMockFns, mapperToDomain } from '../mocks';
import { MockClass } from 'common/mocks';
import { GetTaskById } from 'tasks/application';
import { TaskNotFound, IncorrectId } from 'tasks/application/exceptions';
import { type IOneTask } from 'tasks/application/repositories/ITaskRepository';
import { type toModel } from 'common';
import { type IDTO } from 'tasks/application/useCases/getTaskById/DTO';
import { type ITask, TaskImplementation } from 'tasks/domain';

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

describe('test of the get task by id use case', () => {
  describe('test props errors', () => {
    const OneTask: IOneTask = new OneTaskMock() as IOneTask;
    const GetTaskByIdUseCase = new GetTaskById(OneTask);

    test('test when the id is empty string then must return a error', async () => {
      const Props: IDTO = {
        id: '',
      };

      const executeFn = GetTaskByIdUseCase.execute(Props);

      await expect(executeFn).rejects.toBeInstanceOf(IncorrectId);
    });

    test('test when the id is equals to zero then must return a error', async () => {
      const Props: IDTO = {
        id: 4,
      };

      const executeFn = GetTaskByIdUseCase.execute(Props);

      await expect(executeFn).rejects.toBeInstanceOf(TaskNotFound);
    });

    test('test when the task was found, when i give the correct id then return the task found', async () => {
      const Props: IDTO = {
        id: 1,
      };

      const executeFn = await GetTaskByIdUseCase.execute(Props);

      expect(executeFn).toBeInstanceOf(TaskImplementation);
    });
  });
});
