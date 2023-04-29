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
    if (props.limit != null && props.limit <= 0) {
      throw new LimitMustBeGreatThanToZero();
    }

    if (props.skip != null && props.skip < 0) {
      throw new SkipMustBeGreatEqualThanToZero();
    }

    const allTaskData =
      props.skip != null && props.limit != null
        ? await this.allTask.withPaginate(
            props.skip,
            props.limit,
            props?.filter,
            props?.search,
          )
        : await this.allTask.withoutPaginate(props?.filter, props?.search);

    if (allTaskData.length === 0) {
      throw new CantFoundTasks();
    }

    return allTaskData;
  }
}

export default GetAllTask;
