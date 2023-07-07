import type { User } from 'users/domain/interfaces';

export interface DTO {
  phone?: number;
  pin?: number;
  foundUser?: User;
}
