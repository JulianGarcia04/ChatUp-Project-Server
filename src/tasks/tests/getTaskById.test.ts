import { describe, expect, test, jest } from '@jest/globals';
import { GetTaskById } from '../application';
import { type IOneTask } from 'tasks/application/repositories/ITaskRepository';
import { type IDTO } from 'tasks/application/useCases/getTaskById/DTO';
import { type ITask, type IException } from 'tasks/domain/';

const OneTaskMock = jest.fn();

describe('test of the get task by id use case', () => {
  describe('test props errors', () => {
    const task: ITask = {
      id: 1,
      title: 'hola mundo',
      description: 'este es un saludo',
      isReady: false,
      isDelete: false,
    };
    // OneTask repository mock
    OneTaskMock.prototype.withId = jest.fn((id: string | number): ITask => {
      return task;
    });
    const OneTask: IOneTask = new OneTaskMock() as IOneTask;
    const GetTaskByIdUseCase = new GetTaskById(OneTask);

    test('test when the token isnt in the props then has return a error', () => {
      const Props: IDTO = {
        id: 1,
        token: '',
      };

      const exceptionObject: IException = {
        code: 403,
        name: 'please sign in',
        message: 'dont has the token',
        stack: 'dont has the token, please sign in',
      };

      expect(() => GetTaskByIdUseCase.execute(Props)).toThrowError(
        exceptionObject.name,
      );
    });

    test('test when the id is empty string then must return a error', () => {
      const Props: IDTO = {
        id: '',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      };

      const exceptionObject: IException = {
        code: 500,
        name: 'error in the server',
        message: 'error with id',
        stack: 'the id is incorrect, please check the id',
      };

      expect(() => GetTaskByIdUseCase.execute(Props)).toThrowError(
        exceptionObject.name,
      );
    });

    test('test when the id is equals to zero then must return a error', () => {
      const Props: IDTO = {
        id: 0,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      };

      const exceptionObject: IException = {
        code: 500,
        name: 'error in the server',
        message: 'error with id',
        stack: 'the id is incorrect, please check the id',
      };

      expect(() => GetTaskByIdUseCase.execute(Props)).toThrowError(
        exceptionObject.name,
      );
    });
  });
});
