import { type IUseCase } from '../../common/IUseCase';
import { type ITask } from 'tasks/domain/interfaces/ITask';
import { type ITaskRepository } from 'tasks/application/common/ITaskRepository';
import { type IDTO } from './DTO';

class GetTaskById implements IUseCase<ITask, IDTO> {
  private readonly taskRepository: ITaskRepository<IDTO>;
  constructor(TaskRepository: ITaskRepository<IDTO>) {
    this.taskRepository = TaskRepository;
  }

  execute(props: IDTO): ITask {
    const task = this.taskRepository.getOne(props);
    return task;
  }
}
