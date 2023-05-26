import { type UseCase } from 'common/application/interfaces/UseCase';
import { type DTO } from './DTO';
import { type Messsage } from 'common/domain/interfaces/Message';
import { MessageImplementation } from 'common/domain/implementations';
import { type IEditTask, type IOneTask } from 'tasks/application';
import {
  TaskNotFound,
  CantDeleteTask,
  IncorrectId,
} from 'tasks/application/exceptions';

class DeleteTask implements UseCase<Messsage, DTO> {
  private readonly oneTask: IOneTask;
  private readonly editTask: IEditTask;

  constructor(OneTaskRepository: IOneTask, EditTaskRepository: IEditTask) {
    this.oneTask = OneTaskRepository;
    this.editTask = EditTaskRepository;
  }

  async execute(props: DTO): Promise<Messsage> {
    if (props.id == null || Number(props.id) <= 0) {
      throw new IncorrectId();
    }
    const isExists = await this.oneTask.withId(props.id);
    if (isExists == null) {
      throw new TaskNotFound();
    }

    await this.editTask.withId(props.id, {
      isDelete: true,
    });

    const task = await this.oneTask.withId(props.id);

    const isDeleted = task?.isDelete;
    if (isDeleted != null && !isDeleted) {
      throw new CantDeleteTask();
    }

    return new MessageImplementation({
      code: 200,
      message: 'The task was deleted correctly',
    });
  }
}

export default DeleteTask;
