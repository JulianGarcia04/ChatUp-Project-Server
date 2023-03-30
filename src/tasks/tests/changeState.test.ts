import { describe, expect, test, jest } from '@jest/globals';
import {
  type IOneTask,
  type IEditTask,
} from 'tasks/application/repositories/ITaskRepository';
import { type ITask, TaskDomain } from 'tasks/domain';
import { ChangeState } from 'tasks/application/useCases';
import { type DTO } from 'tasks/application/useCases/changeState/DTO';

const OneTaskMock = jest.fn();
const EditTaskMock = jest.fn();

class ToDomain {
  execute(data: unknown): ITask {
    const mapper = TaskDomain.create(data as ITask);
    console.log(mapper);
    return mapper;
  }
}

const task: ITask = {
  id: 1,
  title: 'Prueba',
  description: 'La descripción de la prueba',
  isReady: false,
  isDelete: false,
};

OneTaskMock.prototype.withId = jest.fn((id: string & number): ITask | null => {
  if (id > 1) {
    return null;
  }
  return task;
});

EditTaskMock.prototype.withId = jest.fn(
  (id: number | string, props: unknown): ITask => {
    const data = {
      ...task,
      ...(props as ITask),
    };
    const toTask = new ToDomain().execute(data);
    return toTask;
  },
);

describe('test the change state task usecase', () => {
  const oneTask = new OneTaskMock() as IOneTask;
  const editTask = new EditTaskMock() as IEditTask;
  const changeStateUseCase = new ChangeState(editTask, oneTask);
  test('test when the task dont exists, I going to give the params with id is a code that doesnt exits, then must return error', () => {
    const props: DTO = { id: 3, isReady: true };
    expect(() => changeStateUseCase.execute(props)).toThrowError(
      'Task no found',
    );
  });

  test('test when change the state in the task, I going to give the params for that want change the state, must return a confirm message', () => {
    const props: DTO = { id: 1, isReady: true };
    const toReturn = {
      code: 200,
      message: 'your task change the state',
    };
    expect(changeStateUseCase.execute(props)).toMatchObject(toReturn);
  });
});
