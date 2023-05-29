import { type toModel } from 'src/common';
import { type ITask } from 'tasks/domain';
import { type CreatedDate, type Id } from 'common/domain';

interface taskJSON extends CreatedDate, Id {
  readonly title: string;
  readonly description: string;
  readonly isReady: boolean;
}

class ToJSONTask implements toModel<ITask, taskJSON> {
  execute({ id, title, description, isReady, createdDate }: ITask): taskJSON {
    return {
      id,
      title,
      description,
      isReady,
      createdDate,
    };
  }
}

export default ToJSONTask;
