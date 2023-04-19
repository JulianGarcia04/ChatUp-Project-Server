import { type ITask } from 'src/tasks/domain';
import { type ICreateTask } from 'tasks/application';
import { Task } from '../schemas';

class CreateTask implements ICreateTask {
  async save(props: ITask): Promise<void> {
    const task = new Task(props);
    await task.save();
  }
}

export default new CreateTask();
