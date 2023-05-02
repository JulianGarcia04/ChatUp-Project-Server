import { type IEditTask } from 'tasks/application';
import { type ITask } from 'tasks/domain';
import { Task } from '../schemas';

class EditTask implements IEditTask {
  async withId(id: string | number, props: unknown): Promise<void> {
    await Task.findOneAndUpdate({ id }, props as ITask);
  }
}

export default EditTask;
