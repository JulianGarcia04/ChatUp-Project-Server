import type { DTO } from '../DTO';
import type { SignIn as Context } from '../';
import type { User } from 'users/domain/interfaces';

export abstract class State {
  protected context?: Context;

  public setContext(context: Context): void {
    this.context = context;
  }
  public abstract execute(props: DTO, user?: User): Promise<unknown>;
}

export { default as OnlyPhone } from './OnlyPhone';
export { default as OnlyPin } from './OnlyPin';
export { default as BothProps } from './BothProps';
