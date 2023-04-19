import { type ITask } from 'src/tasks/domain';
import { type IOneTask } from 'tasks/application';
import { Task } from '../schemas';

class OneTask implements IOneTask {
  async withId(id: string | number): Promise<ITask | null> {
    const findTask = await Task.findOne({ id });
    return findTask;
  }
}

export default new OneTask();
