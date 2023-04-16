import { test, describe, expect, beforeEach } from '@jest/globals';
import { RepositorysMockFns, mapperToDomain } from './mocks';
import { MockClass } from 'common/mocks';
import { GetAllTask } from '../application';
import { ExceptionImplementation } from 'common/domain/implementations';
import { type IAllTask } from '../application/repositories/ITaskRepository';
import { type DTO } from '../application/useCases/getAllTask/DTO';
import { type ITask } from 'tasks/domain';
import { type toDomain } from 'common';

const DATA = [
  {
    id: 1,
    title: 'Hola mundo',
    description: 'mi primer hola mundo',
    isReady: false,
    isDelete: false,
  },
  {
    id: 2,
    title: 'Hola mundo 2',
    description: 'mi segundo hola mundo',
    isReady: false,
    isDelete: false,
  },
  {
    id: 3,
    title: 'Hola mundo 3',
    description: 'mi tercer hola mundo',
    isReady: false,
    isDelete: false,
  },
  {
    id: 4,
    title: 'Hola mundo 4',
    description: 'mi cuarto hola mundo',
    isReady: false,
    isDelete: false,
  },
  {
    id: 5,
    title: 'Hola mundo 5',
    description: 'mi quinto hola mundo',
    isReady: false,
    isDelete: false,
  },
  {
    id: 6,
    title: 'Hola mundo 6',
    description: 'mi sexto hola mundo',
    isReady: false,
    isDelete: false,
  },
];

// mapper mock class
const ToDomain = MockClass(
  ['execute'],
  [(task: ITask) => mapperToDomain(task)],
);

const toDomainImplementation = new ToDomain() as toDomain<ITask>;

// repositoryFns
const repositoryMock = new RepositorysMockFns(toDomainImplementation);

beforeEach(() => {
  repositoryMock.tasks = [];
  repositoryMock.tasks = DATA;
});

const FindAllMock = MockClass(
  ['withPaginate', 'withoutPaginate'],
  [
    async (skip: number, limit: number, filter?: unknown) =>
      await repositoryMock.findAllPaginate(skip, limit, filter),
    async (filter?: unknown) => await repositoryMock.findAll(filter),
  ],
);

describe('get all tasks with pagination use case', () => {
  const allTask = new FindAllMock() as IAllTask;
  test(' test DTO data, where the limit prop is zero and skip prop is zero and dont give the filter prop; and must return throw error because limit mustnt be less than to zero', async () => {
    const getAllTaskUseCase = new GetAllTask(allTask);
    const props: DTO = { limit: 0, skip: 0 };

    const executeFn = getAllTaskUseCase.execute(props);

    await expect(executeFn).rejects.toBeInstanceOf(ExceptionImplementation);
  });

  test('test DTO data, where the limit prop is five and skip prop is less one and dont give the filter prop; and must return throw error because skip mustnt be less than to zero', async () => {
    const getAllTaskUseCase = new GetAllTask(allTask);
    const props: DTO = { limit: 5, skip: -1 };

    const executeFn = getAllTaskUseCase.execute(props);

    await expect(executeFn).rejects.toBeInstanceOf(ExceptionImplementation);
  });

  test('test return data, where the limit prop is five and skip is five and give the filter prop where i going to filter as isReady prop; and must return throw error because didnt found data', async () => {
    const getAllTaskUseCase = new GetAllTask(allTask);
    const props: DTO = { limit: 5, skip: 0, filter: [['isReady', '==', true]] };

    const executeFn = getAllTaskUseCase.execute(props);

    await expect(executeFn).rejects.toBeInstanceOf(ExceptionImplementation);
  });

  test('test return data, where the limit prop is five and skip is 0 and must return the array object', async () => {
    const getAllTaskUseCase = new GetAllTask(allTask);
    const props: DTO = { limit: 5, skip: 0 };

    const executeFn = await getAllTaskUseCase.execute(props);

    expect(executeFn).toHaveLength(5);
  });
});
