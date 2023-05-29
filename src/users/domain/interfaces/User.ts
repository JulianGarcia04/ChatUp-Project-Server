import { type Id, type IsDelete, type CreatedDate } from 'src/common';

export interface User extends Id, IsDelete, CreatedDate {
  name: string;
  lastname: string;
  about: string;
  genre: string;
  age: number;
  birthdate: Date;
  phone: number;
  email: string;
  pin: number;
  lastTime: Date;
  isOnline: boolean;
}
