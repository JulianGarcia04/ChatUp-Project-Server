import { type IBaseRepository } from 'common/IBaseRepository';
import { type ITask } from 'tasks/domain/interfaces/ITask';

export interface ITaskRepository<TDTO> extends IBaseRepository<TDTO, ITask> {}
