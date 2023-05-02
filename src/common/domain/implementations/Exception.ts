import { type Exception } from '../interfaces';

class ExceptionImplementation extends Error implements Exception {
  private readonly _code: number;

  constructor(props: Exception) {
    super(props.message);
    this.name = props.name;
    this._code = props.code ?? 500;
    this.cause = props.cause;
    if (props.stack != null) {
      this.stack = props.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public get code(): number {
    return this._code;
  }
}

export default ExceptionImplementation;
