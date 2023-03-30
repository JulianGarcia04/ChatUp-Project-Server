import { type ITask } from '../interfaces';

class Task implements ITask {
  private readonly _id: string | number;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _isReady: boolean;
  private readonly _isDelete: boolean;

  private constructor({ id, title, description, isReady, isDelete }: ITask) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._isReady = isReady;
    this._isDelete = isDelete;
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

  public static create(props: ITask): ITask {
    const task = new Task(props);

    return task;
  }
}

export default Task;
