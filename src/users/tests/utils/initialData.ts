import type { User } from 'users/domain/interfaces';

export const initialData: User[] = [
  {
    id: 1,
    name: 'Julián',
    lastname: 'García',
    about: 'Io sto imparando la lingua italiana',
    email: 'jcgrrincon@gmail.com',
    age: 19,
    birthdate: new Date('13-02-2004'),
    genre: 'male',
    phone: 3023001508,
    pin: 12345,
    createdDate: new Date(Date.now()),
    isOnline: true,
    isDelete: false,
  },
  {
    id: 2,
    name: 'Fernando',
    lastname: 'Triana',
    about: 'Io sto imparando la lingua italiana',
    email: 'fHernandez@gmail.com',
    age: 22,
    birthdate: new Date('13-02-2001'),
    genre: 'male',
    phone: 3014335443,
    pin: 12345,
    createdDate: new Date(Date.now()),
    isOnline: true,
    isDelete: false,
  },
  {
    id: 3,
    name: 'Martina',
    lastname: 'Rossi',
    about: 'Io sto imparando la lingua inglesa',
    email: 'Rossita90@hotmail.com',
    age: 22,
    birthdate: new Date('13-02-2000'),
    genre: 'female',
    phone: 3175001763,
    pin: 12345,
    createdDate: new Date(Date.now()),
    lastTime: new Date('23-05-2023'),
    isOnline: false,
    isDelete: false,
  },
];

export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
