import { type toModel } from 'common';
import { type ITask } from 'src/tasks/domain';

class ToJSONTask implements toModel<ITask> {
  execute({
    id,
    title,
    description,
    isReady,
    isDelete,
    createdDate,
  }: ITask): ITask {
    return {
      id,
      title,
      description,
      isReady,
      isDelete,
      createdDate,
    };
  }
}

export default new ToJSONTask();
