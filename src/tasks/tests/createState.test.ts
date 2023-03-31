import { describe, expect, test, jest } from '@jest/globals';
import {
  type IOneTask,
  type ICreateTask,
} from 'tasks/application/repositories/ITaskRepository';
import { type ITask } from 'tasks/domain';
import { CreateTask } from 'tasks/application/useCases';

const tasks: ITask[] = [
  {
    id: 1,
    title: 'Hola mundo',
    description: 'mi primer hola mundo',
    isReady: false,
    isDelete: false,
  },
];

const CreateTaskMock = jest.fn();
const CreateTaskMockFaile = jest.fn();
const OneTaskMock = jest.fn();

CreateTaskMockFaile.prototype.save = jest.fn((props: ITask): void => {});

CreateTaskMock.prototype.save = jest.fn((props: ITask): void => {
  tasks.push(props);
});

OneTaskMock.prototype.withId = jest.fn((id: string | number): ITask => {
  const data = tasks.find(e => e.id === id);
  const isFound = data ?? data;
  return isFound as ITask;
});

describe('tests create task usecase', () => {
  const createTask = new CreateTaskMock() as ICreateTask;
  const createTaskFaile = new CreateTaskMockFaile() as ICreateTask;
  const oneTask = new OneTaskMock() as IOneTask;
  test('test when the task is on the database then must return a error', () => {
    const createTaskUseCase = new CreateTask(createTask, oneTask);
    const props: ITask = {
      id: 1,
      title: 'Hola mundo',
      description: 'mi primer hola mundo',
      isReady: false,
      isDelete: false,
    };

    const ErrorName = 'The task is duplicate';

    expect(() => createTaskUseCase.execute(props)).toThrowError(ErrorName);
  });

  test('test check that the object be saved in the database correctly then return error', () => {
    const createTaskUseCase = new CreateTask(createTaskFaile, oneTask);
    const props = {
      id: 3,
      title: 'mi tercero hola mundo',
      description: 'saludo tres veces',
      isReady: false,
      isDelete: false,
    };

    const nameError = 'Error to save the task';

    expect(() => createTaskUseCase.execute(props)).toThrowError(nameError);
  });

  test('test when finished the usecase must return a message', () => {
    const createTaskUseCase = new CreateTask(createTask, oneTask);
    const props = {
      id: 3,
      title: 'mi tercero hola mundo',
      description: 'saludo tres veces',
      isReady: false,
      isDelete: false,
    };

    const objMessage = {
      code: 202,
      message: 'The task was created correctly',
    };

    expect(createTaskUseCase.execute(props)).toMatchObject(objMessage);
  });
});
