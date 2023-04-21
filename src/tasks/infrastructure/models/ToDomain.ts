import { type toModel } from 'common';
import { type ITask, TaskImplementation } from 'src/tasks/domain';
import { IsDelete, CreatedDate } from 'common/domain';

class ToDomainTask implements toModel<ITask> {
  execute(props: unknown): ITask {
    const task = props as ITask;
    const isDelete = IsDelete.create(task.isDelete).isDelete;
    const createdDate = CreatedDate.create(task.createdDate).createdDate;
    return TaskImplementation.create({ ...task, isDelete, createdDate });
  }
}

export default new ToDomainTask();
