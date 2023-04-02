import { describe, expect, test, jest } from '@jest/globals';
import {
  type IOneTask,
  type IEditTask,
} from 'tasks/application/repositories/ITaskRepository';
import { type ITask, TaskDomain } from 'tasks/domain';
import { DeleteTask } from 'tasks/application/useCases';
import { type DTO } from 'tasks/application/useCases/deleteTask/DTO';

const OneTaskMock = jest.fn();
const EditTaskMock = jest.fn();
const EditTaskMockFaile = jest.fn();

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

EditTaskMockFaile.prototype.withId = jest.fn(
  (id: number | string, props: unknown): ITask => {
    const data = {
      ...task,
    };
    const toTask = new ToDomain().execute(data);
    return toTask;
  },
);

describe('test the delete task usecase', () => {
  const oneTask = new OneTaskMock() as IOneTask;
  const editTask = new EditTaskMock() as IEditTask;
  const editTaskFaile = new EditTaskMockFaile() as IEditTask;

  test('test when the task dont exists, I going to give the params with id is a code that doesnt exits, then must return error', () => {
    const changeStateUseCase = new DeleteTask(oneTask, editTask);
    const props: DTO = { id: 3 };
    expect(() => changeStateUseCase.execute(props)).toThrowError(
      'Task no found',
    );
  });

  test('test when the task cant delete, I going to give the isDelete param in true but mustnt update, thene must return a error', () => {
    const changeStateUseCase = new DeleteTask(oneTask, editTaskFaile);
    const props = { id: 1 };

    expect(() => changeStateUseCase.execute(props)).toThrowError(
      'Cant delete task',
    );
  });

  test('test when change the state in the task, I going to give the params for that want change the state, must return a confirm message', () => {
    const changeStateUseCase = new DeleteTask(oneTask, editTask);
    const props: DTO = { id: 1 };
    const toReturn = {
      code: 200,
      message: 'The task was deleted correctly',
    };
    expect(changeStateUseCase.execute(props)).toMatchObject(toReturn);
  });
});
