import {
  CreateTask,
  GetAllTask,
  DeleteTask,
  ChangeBodyTask,
  GetTaskById,
} from 'tasks/application';
import {
  OneTaskRepository,
  CreateTaskRepository,
  AllTasksRepository,
  EditTaskRepository,
} from 'tasks/infrastructure/repositories';
import {
  CreateTaskController,
  FindTasksController,
  DeleteTaskController,
  UpdateTaskController,
  FindTaskController,
} from 'tasks/infrastructure/controllers';

import { Uuid } from 'common/infrastructure/wrappers';
import { ToDomainTask, ToJSONTask } from 'tasks/infrastructure/models';
import { ToDomainException, ToJSONException, ToJSONMessage } from 'src/common';
import { HandleTokenService } from 'users/infrastructure/services';
import { IdGeneratorService } from 'common/infrastructure/services';

// Services

export const tokenService = new HandleTokenService();
export const idGeneratorService = new IdGeneratorService();

// Wrappers

export const uuid = new Uuid();

// Models
export const toDomainException = new ToDomainException();
export const toDomainTask = new ToDomainTask();
export const toJSONException = new ToJSONException();
export const toJSONMessage = new ToJSONMessage();
export const toJSONTask = new ToJSONTask();

// Repositories
export const oneTaskRepository = new OneTaskRepository();
export const createTaskRepository = new CreateTaskRepository();
export const allTasksRepository = new AllTasksRepository();
export const updateTaskRepository = new EditTaskRepository();

// Controllers
export const createTaskController = new CreateTaskController();
export const findTasksController = new FindTasksController();
export const deleteTaskController = new DeleteTaskController();
export const updateTaskController = new UpdateTaskController();
export const findTaskController = new FindTaskController();

// Use cases
export const createTaskUseCase = new CreateTask(
  createTaskRepository,
  oneTaskRepository,
);

export const getAllTasksUseCase = new GetAllTask(allTasksRepository);

export const deleteTaskUseCase = new DeleteTask(
  oneTaskRepository,
  updateTaskRepository,
);

export const updateTaskUseCase = new ChangeBodyTask(
  updateTaskRepository,
  oneTaskRepository,
);

export const findTaskUseCase = new GetTaskById(oneTaskRepository);
