import { type IUseCase } from '../../common/IUseCase';
import { type ITask } from 'tasks/domain/interfaces';
import { type IOneTask } from 'tasks/application/repositories/ITaskRepository';
import { type IDTO } from './DTO';
import { DontHasToken, IncorrectId } from '../../exceptions';

class GetTaskById implements IUseCase<ITask, IDTO> {
  private readonly OneTask: IOneTask;
  constructor(OneTask: IOneTask) {
    this.OneTask = OneTask;
  }

  execute(props: IDTO): ITask {
    if (props.token.length === 0) {
      throw new DontHasToken();
    }
    if (props.id.toString().length === 0 || props.id === 0) {
      throw new IncorrectId();
    }

    const task = this.OneTask.withId(props.id);

    return task;
  }
}

export default GetTaskById;
