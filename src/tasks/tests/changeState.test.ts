import { describe, expect, test, beforeEach } from '@jest/globals';
import {
  type IOneTask,
  type IEditTask,
} from 'tasks/application/repositories/ITaskRepository';
import { type ITask } from 'tasks/domain';
import { ChangeState } from 'tasks/application/useCases';
import { type DTO } from 'tasks/application/useCases/changeState/DTO';
import { type toDomain } from 'common';
import { MessageImplementation } from 'common/implementations';
import { TaskNotFound } from '../application/exceptions';
import { MockClass } from 'common/mocks';
import { RepositorysMockFns, mapperToDomain } from './mocks';

// const data
const task = {
  id: 1,
  title: 'Prueba',
  description: 'La descripción de la prueba',
  isReady: false,
  isDelete: false,
};

// mapper mock class
const ToDomain = MockClass(
  ['execute'],
  [(task: ITask) => mapperToDomain(task)],
);

const toDomainImplementation = new ToDomain() as toDomain<ITask>;

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

describe('test the change state task usecase', () => {
  const oneTask = new OneTaskMock() as IOneTask;
  const editTask = new EditTaskMock() as IEditTask;
  const changeStateUseCase = new ChangeState(editTask, oneTask);
  test('test when the task dont exists, I going to give the params with id is a code that doesnt exits, then must return error', async () => {
    const props: DTO = { id: 3, isReady: true };

    const executeFn = changeStateUseCase.execute(props);
    await expect(executeFn).rejects.toBeInstanceOf(TaskNotFound);
  });

  test('test when change the state in the task, I going to give the params for that want change the state, must return a confirm message', async () => {
    const props: DTO = { id: 1, isReady: true };
    const executeFn = await changeStateUseCase.execute(props);

    expect(executeFn).toBeInstanceOf(MessageImplementation);
  });
});
