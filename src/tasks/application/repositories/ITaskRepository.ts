import {
  type IAllRepository,
  type ICreateRepository,
  type IEditRepository,
  type IOneRepository,
} from 'common/application/interfaces/IBaseRepository';
import { type ITask } from 'tasks/domain/interfaces/ITask';

export interface IAllTask extends IAllRepository<ITask> {}

export interface IOneTask extends IOneRepository<ITask> {}

export interface ICreateTask extends ICreateRepository<ITask> {}

export interface IEditTask extends IEditRepository {}
