import { type Messsage } from '../interfaces/Message';

class MessageImplementation implements Messsage {
  private readonly props: Messsage;
  constructor(props: Messsage) {
    this.props = props;
  }

  get code(): number {
    return this.props.code;
  }

  get message(): string {
    return this.props.message;
  }
}

export default MessageImplementation;
