import { type ITask } from 'src/tasks/domain';
import { type IOneTask } from 'tasks/application';
import { Task } from '../schemas';
import { toDomainTask } from 'src/container';

class OneTask implements IOneTask {
  async withId(id: string | number): Promise<ITask | null> {
    const findTask = await Task.findOne({ id });
    const task = findTask != null ? toDomainTask.execute(findTask) : null;
    return task;
  }
}

export default OneTask;
