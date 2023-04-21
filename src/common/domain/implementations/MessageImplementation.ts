import { type Messsage } from '../interfaces/Message';

class MessageImplementation implements Messsage {
  #props: Messsage;
  constructor(props: Messsage) {
    this.#props = props;
  }

  public get code(): number {
    return this.#props.code;
  }

  public get message(): string {
    return this.#props.message;
  }
}

export default MessageImplementation;
