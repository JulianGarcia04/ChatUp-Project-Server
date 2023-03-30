import { type Exception } from '../Exception';

class ExceptionImplementation extends Error implements Exception {
  protected props: Exception;

  constructor(props: Exception) {
    super(props.name);
    this.props = props;
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
