import { type UseCase } from 'common/UseCase';
import { type createTaskDTO } from './DTO';
import { type ITask, TaskDomain } from 'tasks/domain';
import {
  type ICreateTask,
  type IOneTask,
} from '../../repositories/ITaskRepository';
import {
  TaskIsDuplicate,
  CantCreatedDomainObject,
  CantBeSaved,
} from '../../exceptions';
import { MessageImplementation } from 'common/implementations';

class CreateTask implements UseCase<MessageImplementation, createTaskDTO> {
  OneTask: IOneTask;
  CreateTask: ICreateTask;

  constructor(createRepository: ICreateTask, OneRepository: IOneTask) {
    this.OneTask = OneRepository;
    this.CreateTask = createRepository;
  }

  execute(props: createTaskDTO): MessageImplementation {
    // check that the task dont exits
    const checkRepeat: ITask = this.OneTask.withId(props.id);
    if (checkRepeat !== undefined) {
      throw new TaskIsDuplicate();
    }
    // check that the task domain object be created
    const task = TaskDomain.create(props);
    if (task === null && !task) {
      throw new CantCreatedDomainObject();
    }

    // save task
    this.CreateTask.save(props);

    // check that the task domain object be created
    const checkBeSaved: ITask = this.OneTask.withId(props.id);
    if (checkBeSaved == null && !checkBeSaved) {
      throw new CantBeSaved();
    }
    // confirm message
    return new MessageImplementation({
      code: 202,
      message: 'The task was created correctly',
    });
  }
}

export default CreateTask;
