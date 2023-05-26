import { type Messsage, type UseCase, MessageImplementation } from 'src/common';
import { type IOneTask, type IEditTask } from 'tasks/application';
import {
  RequiredParams,
  TaskNotFound,
  IncorrectId,
  CantBeEmpty,
} from 'tasks/application/exceptions';
import { type ITask } from 'tasks/domain';
import { type DTO } from './DTO';

class ChangeBodyTask implements UseCase<Messsage, DTO> {
  private readonly editTask: IEditTask;
  private readonly oneTask: IOneTask;

  constructor(editTask: IEditTask, oneTask: IOneTask) {
    this.editTask = editTask;
    this.oneTask = oneTask;
  }

  async execute(props: DTO): Promise<Messsage> {
    const body = props.body as ITask;

    if (props.id == null || Number(props.id) <= 0) {
      throw new IncorrectId();
    }

    const checkTask = await this.oneTask.withId(props.id);
    if (checkTask == null) {
      throw new TaskNotFound();
    }

    if (Object.entries(body).length === 0) {
      throw new CantBeEmpty('body');
    }

    if (
      Object.hasOwn(body, 'id') ||
      Object.hasOwn(body, 'createdDate') ||
      Object.hasOwn(body, 'isDelete')
    ) {
      throw new RequiredParams('title', 'description', 'isReady');
    }

    await this.editTask.withId(props.id, body);

    return new MessageImplementation({
      code: 202,
      message: 'Task updated correctly',
    });
  }
}

export default ChangeBodyTask;
