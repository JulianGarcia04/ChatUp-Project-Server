import { type UseCase } from 'common/UseCase';
import { type IAllTask } from 'tasks/application';
import { type ITask } from 'tasks/domain';
import { type DTO } from './DTO';

class GetAllTask implements UseCase<ITask, DTO> {
  private readonly allTask: IAllTask;
  constructor(allTask: IAllTask) {
    this.allTask = allTask;
  }

  async execute(props: DTO): Promise<ITask[]> {
    const allTaskData = await this.allTask.withPaginate(
      props.filter,
      props.skip,
      props.limit,
    );
    return allTaskData;
  }
}

export default GetAllTask;
