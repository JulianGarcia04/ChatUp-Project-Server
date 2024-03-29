import { type UseCase } from 'common/application/interfaces/UseCase';
import { type createTaskDTO } from './DTO';
import { type ITask, TaskImplementation } from 'tasks/domain';
import {
  type ICreateTask,
  type IOneTask,
} from '../../repositories/ITaskRepository';
import {
  TaskIsDuplicate,
  CantCreatedDomainObject,
  CantBeSaved,
} from '../../exceptions';
import {
  MessageImplementation,
  CreatedDateImplementation,
  IsDeleteImplementation,
  IdImplementation,
} from 'common/domain/implementations';

class CreateTask implements UseCase<MessageImplementation, createTaskDTO> {
  private readonly OneTask: IOneTask;
  private readonly CreateTask: ICreateTask;

  constructor(createRepository: ICreateTask, OneRepository: IOneTask) {
    this.OneTask = OneRepository;
    this.CreateTask = createRepository;
  }

  async execute(props: createTaskDTO): Promise<MessageImplementation> {
    // check that the task dont exits
    const checkRepeat: ITask | null = await this.OneTask.withId(props.id);
    if (checkRepeat != null) {
      throw new TaskIsDuplicate();
    }
    // check that the task domain object be created
    const id = IdImplementation.create(props.id);
    const isDelete = IsDeleteImplementation.create().isDelete;
    const createdDate = CreatedDateImplementation.create().createdDate;
    const task = TaskImplementation.create({
      ...props,
      id,
      isDelete,
      createdDate,
    });
    if (task == null && !task) {
      throw new CantCreatedDomainObject();
    }

    // save task
    await this.CreateTask.save({
      id: task.id,
      title: task.title,
      description: task.description,
      isReady: task.isReady,
      isDelete: task.isDelete,
      createdDate: task.createdDate,
    });
    // check that the task domain object be created
    const checkBeSaved: ITask | null = await this.OneTask.withId(props.id);
    if (checkBeSaved == null) {
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
