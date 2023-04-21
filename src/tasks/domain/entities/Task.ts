import { type ITask } from '../interfaces';

class Task implements ITask {
  readonly #props: ITask;

  private constructor(props: ITask) {
    this.#props = props;
  }

  // Getters
  public get id(): string | number {
    return this.#props.id;
  }

  public get title(): string {
    return this.#props.title;
  }

  public get description(): string {
    return this.#props.description;
  }

  public get isReady(): boolean {
    return this.#props.isReady;
  }

  public get isDelete(): boolean {
    return this.#props.isDelete;
  }

  public get createdDate(): Date {
    return this.#props.createdDate;
  }

  public static create(props: ITask): ITask {
    return new Task(props);
  }
}

export default Task;
