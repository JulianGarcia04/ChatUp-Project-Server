import { type IisDelete } from '../interfaces';

class IsDelete implements IisDelete {
  private readonly _isDelete: boolean;

  private constructor(initialValue: boolean) {
    this._isDelete = initialValue;
  }

  get isDelete(): boolean {
    return this._isDelete;
  }

  static create(initialValue?: boolean): IisDelete {
    const isDelete = new IsDelete(initialValue ?? false);
    return isDelete;
  }
}

export default IsDelete;
