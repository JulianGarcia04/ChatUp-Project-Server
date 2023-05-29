import { type toModel } from 'src/common';
import { type ITask, TaskImplementation } from 'src/tasks/domain';
import {
  IsDeleteImplementation,
  CreatedDateImplementation,
  IdImplementation,
} from 'common/domain';

class ToDomainTask implements toModel<unknown, ITask> {
  execute(props: unknown): ITask {
    const { id, title, description, isReady, isDelete, createdDate } =
      props as ITask;
    const idDomain = IdImplementation.create(id).id;
    const isDeleteDomain = IsDeleteImplementation.create(isDelete).isDelete;
    const createdDateDomain =
      CreatedDateImplementation.create(createdDate).createdDate;
    return TaskImplementation.create({
      id: idDomain,
      title,
      description,
      isReady,
      isDelete: isDeleteDomain,
      createdDate: createdDateDomain,
    });
  }
}

export default ToDomainTask;
