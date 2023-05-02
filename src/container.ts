import { CreateTask, GetAllTask, DeleteTask } from 'tasks/application';
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
} from 'tasks/infrastructure/controllers';
import { ToDomainTask, ToJSONTask } from 'tasks/infrastructure/models';
import { ToDomainException, ToJSONException, ToJSONMessage } from 'common';

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
