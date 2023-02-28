import { config } from 'dotenv';

config();

export default {
  PORT: process.env.PORT,
  ENVIROMENT: process.env.NODE_ENV,
};
