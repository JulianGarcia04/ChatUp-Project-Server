import { type toModel } from 'src/common';
import { type ITask } from 'tasks/domain';
import { type createdDate } from 'common/domain';

interface taskJSON extends createdDate {
  readonly id: string | number;
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
