import { type Id, type IsDelete, type CreatedDate } from 'src/common';
import type { IsOnline, Age } from '.';

export interface User extends Id, IsDelete, CreatedDate, IsOnline, Age {
  name: string;
  lastname: string;
  about?: string;
  genre: string;
  birthdate: Date;
  phone: number;
  email: string;
  pin: number;
  lastTime?: Date;
}
