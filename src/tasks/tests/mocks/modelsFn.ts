import { TaskImplementation, type ITask } from 'tasks/domain';

export const mapperToDomain = (task: unknown | ITask): ITask => {
  const objDomain = TaskImplementation.create(task as ITask);
  return objDomain;
};
