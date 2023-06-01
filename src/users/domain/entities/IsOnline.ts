import type { IsOnline } from '../interfaces';

class IsOnlineImplementation implements IsOnline {
  private readonly _isOnline: boolean;

  private constructor(props: boolean) {
    this._isOnline = props;
  }

  get isOnline(): boolean {
    return this._isOnline;
  }

  public static create(isOnline: boolean = false): boolean {
    return new IsOnlineImplementation(isOnline).isOnline;
  }
}

export default IsOnlineImplementation;
