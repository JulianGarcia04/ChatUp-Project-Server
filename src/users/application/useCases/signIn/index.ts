import type { IOneUser } from 'users/application/repositories';
import type { User } from 'users/domain/interfaces';
import OnlyPhone from './states/OnlyPhone';
import { type UseCase } from 'src/common';
import type { State } from './states';
import type { DTO } from './DTO';

export class SignIn implements UseCase<unknown, DTO> {
  public oneUser: IOneUser;
  private state: State = new OnlyPhone();

  constructor(oneUserRepository: IOneUser, initialState: State) {
    this.oneUser = oneUserRepository;
    this.transitionTo(initialState);
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }

  async execute(props: DTO, foundUser?: User): Promise<unknown> {
    if (Object.entries(props).length === 0) {
      throw new Error();
    }

    return await this.state.execute(props, foundUser);
  }
}

export type { DTO } from './DTO';
