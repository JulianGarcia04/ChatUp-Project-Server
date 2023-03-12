import { type ITask } from './interfaces/ITask';
import { type TaskProps } from './interfaces/ITaskProps';

class Task implements ITask {
  private readonly _id: string | number;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _isReady: boolean;
  private readonly _isDelete: boolean;

  private constructor({ id, title, description }: TaskProps) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._isReady = false;
    this._isDelete = false;
  }

  // Getters
  public get id(): string | number {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get isReady(): boolean {
    return this._isReady;
  }

  public get isDelete(): boolean {
    return this._isDelete;
  }

  public static create(props: TaskProps): ITask {
    const task = new Task(props);

    return task;
  }
}

export default Task;
