import { type Exception } from '../interfaces';

class ExceptionImplementation extends Error implements Exception {
  protected props: Exception;

  constructor(props: Exception) {
    super(props.name);
    this.props = {
      code: props.code ?? 500,
      name: props.name,
      message: props.message,
      stack: props.stack,
    };
  }

  public get code(): number {
    return this.props.code;
  }

  public get message(): string {
    return this.props.message;
  }

  public get stack(): string {
    return this.props.stack;
  }
}

export default ExceptionImplementation;
