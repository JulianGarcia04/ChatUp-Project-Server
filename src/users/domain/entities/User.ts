import { type User } from '../interfaces';

class UserImplementation implements User {
  private readonly _props: User;

  private constructor(props: User) {
    this._props = props;
  }

  get id(): string | number {
    return this._props.id;
  }

  get name(): string {
    return this._props.name;
  }

  get lastname(): string {
    return this._props.lastname;
  }

  get about(): string {
    return this._props.about;
  }

  get genre(): string {
    return this._props.genre;
  }

  get age(): number {
    return this._props.age;
  }

  get birthdate(): Date {
    return this._props.birthdate;
  }

  get phone(): number {
    return this._props.phone;
  }

  get email(): string {
    return this._props.email;
  }

  get pin(): number {
    return this._props.pin;
  }

  get lastTime(): Date | undefined {
    return this._props.lastTime;
  }

  get isOnline(): boolean {
    return this._props.isOnline;
  }

  get createdDate(): Date {
    return this._props.createdDate;
  }

  get isDelete(): boolean {
    return this._props.isDelete;
  }

  public static create(user: User): User {
    return new UserImplementation(user);
  }
}

export default UserImplementation;
