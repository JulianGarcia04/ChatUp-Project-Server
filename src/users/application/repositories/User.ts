import {
  type IAllRepository,
  type ICreateRepository,
  type IEditRepository,
  type IOneRepository,
} from 'src/common/application';
import { type User } from 'users/domain/interfaces';

export interface IAllUsers extends IAllRepository<User> {}

export interface IOneUser extends IOneRepository<User> {
  withAnotherProp(prop: unknown): Promise<User | null>;
}

export interface ICreateUser extends ICreateRepository<User> {}

export interface IEditUser extends IEditRepository {}
