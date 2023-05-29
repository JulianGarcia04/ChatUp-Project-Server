import { type Id } from '../interfaces';

class IdImplementation implements Id {
  private readonly _id: string | number;

  private constructor(prop: string | number) {
    this._id = prop;
  }

  public get id(): string | number {
    return this._id;
  }

  public static create(id: string | number): Id {
    return new IdImplementation(id);
  }
}

export default IdImplementation;
