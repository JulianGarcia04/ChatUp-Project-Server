import { type UseCase } from 'common/UseCase';
import { type DTO } from './DTO';
import { type Messsage } from 'common/Message';
import { MessageImplementation } from 'common/implementations';
import { type IEditTask, type IOneTask } from 'tasks/application';
import { type ITask } from 'tasks/domain';
import { TaskNotFound, CantDeleteTask } from 'tasks/application/exceptions';

class DeleteTask implements UseCase<Messsage, DTO> {
  oneTask: IOneTask;
  editTask: IEditTask;

  constructor(OneTaskRepository: IOneTask, EditTaskRepository: IEditTask) {
    this.oneTask = OneTaskRepository;
    this.editTask = EditTaskRepository;
  }

  execute(props: DTO): Messsage | Messsage[] {
    const isExists = this.oneTask.withId(props.id);
    if (isExists === null && !isExists) {
      throw new TaskNotFound();
    }

    const dataChanged: ITask = this.editTask.withId(props.id, {
      isDelete: true,
    });

    const isUndefinedData = Object.values(dataChanged).some(
      taskVal => taskVal === undefined,
    );

    if (isUndefinedData || !dataChanged.isDelete) {
      throw new CantDeleteTask();
    }

    return new MessageImplementation({
      code: 200,
      message: 'The task was deleted correctly',
    });
  }
}

export default DeleteTask;
