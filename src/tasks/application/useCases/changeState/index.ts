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

  execute(props: DTO): Messsage | Messsage[] {
    const task: ITask = this.oneTask.withId(props.id);

    if (task == null) {
      throw new TaskNotFound();
    }

    const dataChanged: ITask = this.editTask.withId(props.id, {
      isReady: props.isReady,
    });

    const isUndefinedData = Object.values(dataChanged).some(
      taskVal => taskVal === undefined,
    );

    if (isUndefinedData || dataChanged.isReady !== props.isReady) {
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
