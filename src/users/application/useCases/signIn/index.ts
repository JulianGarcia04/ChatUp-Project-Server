import type { IOneUser } from 'users/application/repositories';
import type { HandleCookies } from 'src/common/application';
import type { User } from 'users/domain/interfaces';
import type { HandleToken } from '../../services';
import OnlyPhone from './states/OnlyPhone';
import { type UseCase } from 'src/common';
import type { State } from './states';
import type { DTO } from './DTO';

interface TokenService extends HandleToken<unknown> {}

export class SignIn implements UseCase<unknown, DTO> {
  public oneUser: IOneUser;
  private state: State = new OnlyPhone();
  public handleCookieService: HandleCookies;
  public tokenService: TokenService;

  constructor(
    oneUserRepository: IOneUser,
    cookieService: HandleCookies,
    tokenService: TokenService,
    initialState: State,
  ) {
    this.oneUser = oneUserRepository;
    this.handleCookieService = cookieService;
    this.tokenService = tokenService;
    this.transitionTo(initialState);
  }

  public transitionTo(state: State): void {
    this.state = state;
    this.state.setContext(this);
  }

  async execute(props: DTO): Promise<unknown> {
    if (Object.entries(props).length === 0) {
      throw new Error();
    }

    return await this.state.execute(props);
  }
}

export type { DTO } from './DTO';
