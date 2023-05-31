import { type Messsage, MessageImplementation } from 'src/common';
import type { DTO } from '../DTO';
import { State } from '.';
import type { User } from 'src/users/domain/interfaces';

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

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const token = this.context?.tokenService.generate({
      id: checkExitsUser.id,
      pin: checkExitsUser.pin,
    } as User);

    const date = new Date(Date.now());

    const expireDate = new Date(date.setDate(date.getDate() + 1));

    this.context?.handleCookieService.setCookie('session', token, expireDate);

    return new MessageImplementation({
      code: 200,
      message: 'continue',
    });
  }
}

export default OnlyPhone;
