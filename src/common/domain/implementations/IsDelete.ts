import { type IsDelete } from '../interfaces';

class IsDeleteImplementation implements IsDelete {
  private readonly _isDelete: boolean;

  private constructor(initialValue: boolean) {
    this._isDelete = initialValue;
  }

  get isDelete(): boolean {
    return this._isDelete;
  }

  static create(initialValue?: boolean): IsDelete {
    const isDelete = new IsDeleteImplementation(initialValue ?? false);
    return isDelete;
  }
}

export default IsDeleteImplementation;
