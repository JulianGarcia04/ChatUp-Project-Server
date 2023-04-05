import { type UseCase } from 'common/UseCase';
import { type Messsage } from 'common/Message';
import { type DTO } from './DTO';
import {
  type IEditTask,
  type IOneTask,
} from 'tasks/application/repositories/ITaskRepository';
import { MessageImplementation } from 'common/implementations';
import { TaskNotFound, CantUpdateData } from 'tasks/application/exceptions';
import { type ITask } from 'tasks/domain';

class ChangeState implements UseCase<Messsage, DTO> {
  private readonly editTask: IEditTask;
  private readonly oneTask: IOneTask;

  constructor(editTask: IEditTask, oneTask: IOneTask) {
    this.editTask = editTask;
    this.oneTask = oneTask;
  }

  async execute(props: DTO): Promise<Messsage> {
    const task: ITask | null = await this.oneTask.withId(props.id);

    if (task === null) {
      throw new TaskNotFound();
    }

    await this.editTask.withId(props.id, {
      isReady: props.isReady,
    });

    const isChanged: ITask | null = await this.oneTask.withId(props.id);

    if (isChanged?.isReady !== props.isReady) {
      throw new CantUpdateData();
    }

    const toReturn = new MessageImplementation({
      code: 200,
      message: 'your task change the state',
    });

    return toReturn;
  }
}

export default ChangeState;
