import { type UseCase } from 'common/application/interfaces/UseCase';
import { type ITask } from 'tasks/domain/interfaces';
import { type IOneTask } from 'tasks/application/repositories/ITaskRepository';
import { type IDTO } from './DTO';
import { IncorrectId, TaskNotFound } from '../../exceptions';

class GetTaskById implements UseCase<ITask, IDTO> {
  private readonly OneTask: IOneTask;
  constructor(OneTask: IOneTask) {
    this.OneTask = OneTask;
  }

  async execute(props: IDTO): Promise<ITask> {
    if (props.id.toString().length === 0 || props.id === 0) {
      throw new IncorrectId();
    }

    const task = await this.OneTask.withId(props.id);

    console.log(task);

    if (task === null) {
      throw new TaskNotFound();
    }

    return task;
  }
}

export default GetTaskById;
