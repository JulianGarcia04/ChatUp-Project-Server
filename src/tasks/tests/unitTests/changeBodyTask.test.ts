import { describe, expect, test, beforeEach } from '@jest/globals';
import {
  type IOneTask,
  type IEditTask,
} from 'tasks/application/repositories/ITaskRepository';
import { type ITask } from 'tasks/domain';
import { ChangeBodyTask } from 'tasks/application/useCases';
import { type DTO } from 'src/tasks/application/useCases/changeBodyTask/DTO';
import { type toModel } from 'common';
import {
  // MessageImplementation,
  ExceptionImplementation,
  MessageImplementation,
} from 'common/domain/implementations';
import { MockClass } from 'common/mocks';
import { RepositorysMockFns, mapperToDomain } from '../mocks';

// const data
const task: ITask = {
  id: 1,
  title: 'Prueba',
  description: 'La descripción de la prueba',
  isReady: false,
  isDelete: false,
  createdDate: new Date(Date.now()),
};

// mapper mock class
const ToDomain = MockClass(
  ['execute'],
  [(task: ITask) => mapperToDomain(task)],
);

const toDomainImplementation = new ToDomain() as toModel<ITask, ITask>;

// class where contain the functions repositories
const repositoryMock = new RepositorysMockFns(toDomainImplementation);

// before each function
beforeEach(() => {
  repositoryMock.tasks = [];
  repositoryMock.tasks.push(task);
});

// mock repository class
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

const EditTaskMockFail = MockClass(
  ['withId'],
  [
    async (id: string | number, props: unknown) => {
      throw Error('Unknown error');
    },
  ],
);

describe('test the change body task usecase (title and description)', () => {
  const oneTaskMockRepository = new OneTaskMock() as IOneTask;
  const editTaskMockRepository = new EditTaskMock() as IEditTask;
  const editTaskMockRepositoryFail = new EditTaskMockFail() as IEditTask;
  describe('Validate DTO properties', () => {
    test('test when the id DTO property dont exist, then I going to set a id, and body with title and description, then must return a error', async () => {
      const changeBodyTaskUseCase = new ChangeBodyTask(
        editTaskMockRepository,
        oneTaskMockRepository,
      );
      const props: DTO = {
        id: 2,
        body: {
          title: 'Prueba 2',
          description: 'La descripción de la prueba 2',
        },
      };
      const executeFn = changeBodyTaskUseCase.execute(props);
      await expect(executeFn).rejects.toBeInstanceOf(ExceptionImplementation);
    });
    test('test when the body DTO property has the properties diferents to title and description, then i going to the createdDate and id properties, then must return a error because only must has the title and description', async () => {
      const changeBodyTaskUseCase = new ChangeBodyTask(
        editTaskMockRepository,
        oneTaskMockRepository,
      );
      const props: DTO = {
        id: 1,
        body: {
          id: 2,
          createdDate: new Date(Date.now() + 1),
        },
      };

      const executeFn = changeBodyTaskUseCase.execute(props);
      await expect(executeFn).rejects.toBeInstanceOf(ExceptionImplementation);
    });
  });
  describe('Test for check the funcionality', () => {
    test('Test to check if the task changed, then I set the id, and body with isReady and title, then return repository error is because didnt did', async () => {
      const changeBodyTaskUseCase = new ChangeBodyTask(
        editTaskMockRepositoryFail,
        oneTaskMockRepository,
      );
      const props: DTO = {
        id: 1,
        body: {
          isReady: true,
          title: 'Prueba 2',
        },
      };

      const executeFn = changeBodyTaskUseCase.execute(props);
      await expect(executeFn).rejects.toThrowError();
    });
    test('Test to check if the task changed, then I set the id, and body with isReady and title, then if return a confirm message is because the change did correctly', async () => {
      const changeBodyTaskUseCase = new ChangeBodyTask(
        editTaskMockRepository,
        oneTaskMockRepository,
      );
      const props: DTO = {
        id: 1,
        body: {
          isReady: true,
          title: 'Prueba 2',
        },
      };

      const executeFn = await changeBodyTaskUseCase.execute(props);
      expect(executeFn).toBeInstanceOf(MessageImplementation);
    });
  });
});
