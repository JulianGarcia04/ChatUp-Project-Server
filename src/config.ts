import { config } from 'dotenv';

config();

export default {
  PORT: process.env.PORT ?? 4000,
  ENVIROMENT: process.env.NODE_ENV,
  DB_URI_TEST: process.env.DB_URI_TEST,
  DB_URI_DEV: process.env.DB_URI_DEV,
  DB_URI: process.env.DB_URI,
};
