import { type Messsage, MessageImplementation } from 'src/common';
import { State } from '.';
import type { DTO } from '../DTO';
import type { User } from 'src/users/domain/interfaces';

class BothProps extends State {
  public async execute(props: DTO): Promise<Messsage> {
    if (props.phone == null || props.pin == null) {
      throw new Error();
    }
    const checkExitsUser = await this.context?.oneUser.withAnotherProp({
      phone: props?.phone,
    });

    if (checkExitsUser == null) {
      throw new Error();
    }

    const user: User = checkExitsUser;

    if (user.pin !== props.pin) {
      throw new Error();
    }

    return new MessageImplementation({
      code: 200,
      message: 'welcome to the jungle',
    });
  }
}

export default BothProps;
