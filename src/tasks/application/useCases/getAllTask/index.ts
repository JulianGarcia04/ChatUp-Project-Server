import { type UseCase } from 'common/UseCase';
import { type IAllTask } from 'tasks/application';
import { type ITask } from 'tasks/domain';
import { type DTO } from './DTO';

class GetAllTask implements UseCase<ITask, DTO> {
  allTask: IAllTask;
  constructor(allTask: IAllTask) {
    this.allTask = allTask;
  }

  execute(props: DTO): ITask | ITask[] {
    const allTaskData = this.allTask.withPaginate(
      props.filter,
      props.skip,
      props.limit,
    );
    return allTaskData;
  }
}

export default GetAllTask;
