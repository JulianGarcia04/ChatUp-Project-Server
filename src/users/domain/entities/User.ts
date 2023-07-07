import { type User } from '../interfaces';

const TYPEGENRES = ['male', 'female', 'other'];

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

  get about(): string | undefined {
    return this._props?.about;
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

  get phone(): number | string {
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
    return this._props?.createdDate;
  }

  get isDelete(): boolean {
    return this._props.isDelete;
  }

  private validate(): User {
    if (
      typeof this._props.id !== 'string' &&
      typeof this._props.id !== 'number'
    ) {
      throw new TypeError('Id only can be a string or number');
    }

    if (typeof this._props.name !== 'string') {
      throw new TypeError('Name must be a string type');
    }

    if (typeof this._props.lastname !== 'string') {
      throw new TypeError('The lastname only can be a string type');
    }

    if (this._props.about != null && typeof this._props.about !== 'string') {
      throw new TypeError('The about only can be a string type');
    }

    if (typeof this._props.genre !== 'string') {
      throw new TypeError('The genre only can be a string type');
    }

    if (!TYPEGENRES.includes(this._props.genre)) {
      throw new ReferenceError(
        'The genre only can equal to male, female or other',
      );
    }

    if (typeof this._props.age !== 'number') {
      throw new TypeError('The genre only can be number type');
    }

    if (!(this._props.birthdate instanceof Date)) {
      throw new TypeError('The birthdate has a date invalid');
    }

    if (
      typeof this._props.phone !== 'number' &&
      (typeof this._props.phone !== 'string' ||
        (!this._props.phone.startsWith('+') &&
          Number.isNaN(Number(this._props.phone))))
    ) {
      throw new TypeError(
        'The phone prop only can be number or string; if is string must has some number',
      );
    }

    if (
      typeof this._props.email !== 'string' ||
      this._props.email.search(/@/g) === -1
    ) {
      throw new TypeError(
        'The email prop must be a string and must contain the @',
      );
    }

    if (typeof this._props.pin !== 'number') {
      throw new TypeError('The pin must be a number');
    }

    if (this._props.lastTime instanceof Date) {
      throw new TypeError('The lastTime prop has a date invalid');
    }

    if (typeof this._props.isOnline !== 'boolean') {
      throw new TypeError('The isOnline prop must be a boolean type');
    }

    if (!(this._props.createdDate instanceof Date)) {
      throw new TypeError('The createdDate prop has a date invalid');
    }

    if (typeof this._props.isDelete !== 'boolean') {
      throw new TypeError('The isDelete prop must be a boolean type');
    }

    return this._props;
  }

  public static create(user: User): User {
    const createUser = new UserImplementation(user);
    return createUser.validate();
  }
}

export default UserImplementation;
