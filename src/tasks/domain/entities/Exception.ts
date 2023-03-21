import { type IException } from '../interfaces';

class Exception extends Error implements IException {
  protected props: IException;

  constructor(props: IException) {
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

export default Exception;
