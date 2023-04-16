import {
  LimitMustBeGreatThanToZero,
  SkipMustBeGreatEqualThanToZero,
  CantFoundTasks,
} from 'tasks/application/exceptions';
import { type UseCase } from 'common/application/interfaces/UseCase';
import { type IAllTask } from 'tasks/application';
import { type ITask } from 'tasks/domain';
import { type DTO } from './DTO';

class GetAllTask implements UseCase<ITask, DTO> {
  private readonly allTask: IAllTask;
  constructor(allTask: IAllTask) {
    this.allTask = allTask;
  }

  async execute(props: DTO): Promise<ITask[]> {
    if (props.limit <= 0) {
      throw new LimitMustBeGreatThanToZero();
    }

    if (props.skip < 0) {
      throw new SkipMustBeGreatEqualThanToZero();
    }

    const allTaskData = await this.allTask.withPaginate(
      props.skip,
      props.limit,
      props.filter,
    );

    if (allTaskData.length === 0) {
      throw new CantFoundTasks();
    }

    return allTaskData;
  }
}

export default GetAllTask;
