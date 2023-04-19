import { mongodb, type MongodbImplementation } from '../utils';
import config from 'src/config';

class MongodbConnection {
  private readonly dbImplementation: MongodbImplementation = mongodb;

  async connect(): Promise<void> {
    const dbURI: string | undefined =
      config.ENVIROMENT === 'production'
        ? config.DB_URI
        : config.ENVIROMENT === 'development'
        ? config.DB_URI_DEV
        : config.DB_URI_TEST;

    if (dbURI == null || !dbURI.startsWith('mongodb')) {
      throw new Error('Error in the db connection', {
        cause: 'dont has the db url, check the enviroment variables',
      });
    }
    await this.dbImplementation.orm.connect(dbURI);
  }
}

export default new MongodbConnection();
