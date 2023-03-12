import { type IUseCase } from '../../common/IUseCase';
import { type createTaskDTO } from './DTO';
import { type ITask } from 'tasks/domain/interfaces/ITask';
import { TaskDomain } from 'tasks/domain/';

class CreateTask implements IUseCase<ITask, createTaskDTO> {
  execute(props: createTaskDTO): ITask {
    const task = TaskDomain.create(props);
    return task;
  }
}

export default CreateTask;
