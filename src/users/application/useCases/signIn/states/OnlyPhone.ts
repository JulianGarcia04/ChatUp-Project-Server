import { type Messsage, MessageImplementation } from 'src/common';
import type { DTO } from '../DTO';
import { State } from '.';

class OnlyPhone extends State {
  public async execute(props: DTO): Promise<Messsage> {
    if (props.phone == null) {
      throw new Error();
    }
    const checkExitsUser = await this.context?.oneUser.withAnotherProp({
      phone: props?.phone,
    });

    if (checkExitsUser == null) {
      throw new Error();
    }

    return new MessageImplementation({
      code: 200,
      message: 'continue',
    });
  }
}

export default OnlyPhone;
