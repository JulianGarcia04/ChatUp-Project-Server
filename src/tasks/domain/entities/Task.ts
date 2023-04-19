import { type ITask } from '../interfaces';

class Entity<T> {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = props;
  }
}

class Task extends Entity<ITask> implements ITask {
  private constructor({
    id,
    title,
    description,
    isReady,
    isDelete,
    createdDate,
  }: ITask) {
    super({ id, title, description, isReady, isDelete, createdDate });
  }

  // Getters
  public get id(): string | number {
    return this.props.id;
  }

  public get title(): string {
    return this.props.title;
  }

  public get description(): string {
    return this.props.description;
  }

  public get isReady(): boolean {
    return this.props.isReady;
  }

  public get isDelete(): boolean {
    return this.props.isDelete;
  }

  public get createdDate(): Date {
    return this.props.createdDate;
  }

  public static create(props: ITask): ITask {
    return new Task(props);
  }
}

export default Task;
