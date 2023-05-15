import { type ITask } from 'src/tasks/domain';

export const initialTasks: ITask[] = [
  {
    id: 5,
    title: 'Go to the restaurant',
    description: 'Get the food for my wife',
    isReady: true,
    isDelete: false,
    createdDate: new Date(2020, 10, 22),
  },
  {
    id: 7,
    title: 'Do reservation',
    description: 'I need to do the reservation for our anniversary',
    isReady: true,
    isDelete: false,
    createdDate: new Date(2020, 11, 22),
  },
  {
    id: 10,
    title: 'Go to the market',
    description:
      'I need to go to the market for buy the somethings for the restaurant',
    isReady: true,
    isDelete: false,
    createdDate: new Date(2021, 2, 22),
  },
  {
    id: 12,
    title: 'setting up my first restaurant',
    description: 'Is my first business. Yeahhh!',
    isReady: true,
    isDelete: false,
    createdDate: new Date(2022, 0, 1),
  },
  {
    id: 12,
    title: 'setting up my second restaurant',
    description: 'Is my second business. Yeahhh!',
    isReady: true,
    isDelete: false,
    createdDate: new Date(2023, 2, 24),
  },
];
