import { type Messsage, MessageImplementation } from 'src/common';
import { State } from '.';
import type { User } from 'users/domain/interfaces';
import type { DTO } from '../DTO';

class OnlyPin extends State {
  public async execute(props: DTO, user: User): Promise<Messsage> {
    if (props.pin == null) {
      throw new Error();
    }

    if (user == null) {
      throw new Error();
    }

    if (user.pin !== props.pin) {
      throw new Error();
    }

    return new MessageImplementation({
      code: 200,
      message: 'welcome to the jungle',
    });
  }
}

export default OnlyPin;
