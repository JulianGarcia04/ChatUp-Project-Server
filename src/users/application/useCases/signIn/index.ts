import { type UseCase, type Messsage, MessageImplementation } from 'src/common';
import type { User } from 'users/domain/interfaces';
import type { DTO } from './DTO';
import type { IOneUser } from 'users/application/repositories';

class SignIn implements UseCase<Messsage, DTO> {
  private readonly oneUser: IOneUser;

  constructor(oneUserRepository: IOneUser) {
    this.oneUser = oneUserRepository;
  }

  async execute(props: DTO): Promise<Messsage> {
    if (props.phone == null && props.pin == null) {
      throw new Error();
    }

    const checkExitsUser = await this.oneUser.withAnotherProp(props?.phone);

    if (checkExitsUser == null) {
      throw new Error();
    }

    const user: User = checkExitsUser;

    if (user.pin !== props.pin) {
      throw new Error();
    }

    return new MessageImplementation({
      code: 200,
      message: 'Welcome to the jungle',
    });
  }
}

export default SignIn;
