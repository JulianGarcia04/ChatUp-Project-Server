import { type toModel } from 'common';
import { type ITask, TaskImplementation } from 'src/tasks/domain';
import { IsDelete, CreatedDate } from 'common/domain';

class ToDomainTask implements toModel<unknown, ITask> {
  execute(props: unknown): ITask {
    const { id, title, description, isReady, isDelete, createdDate } =
      props as ITask;
    const isDeleteDomain = IsDelete.create(isDelete).isDelete;
    const createdDateDomain = CreatedDate.create(createdDate).createdDate;
    return TaskImplementation.create({
      id,
      title,
      description,
      isReady,
      isDelete: isDeleteDomain,
      createdDate: createdDateDomain,
    });
  }
}

export default ToDomainTask;
