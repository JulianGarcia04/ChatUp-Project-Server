import express, { type Express } from 'express';
import morgan from 'morgan';
import config from './config';
import adminRouter from './routes';
import { parserQueryUrl } from 'common/infrastructure';
import {
  errorInterceptor,
  errorPresentation,
} from 'common/infrastructure/middlewares/ErrorHandler';

abstract class Config {
  private readonly _app: Express = express();
  constructor() {
    this._app.set('PORT', config.PORT);
    this._app.set('query parser', parserQueryUrl);
    this._app.use(express.json());
    this._app.use(morgan('dev'));
    adminRouter(this._app);
    this._app.use(errorInterceptor);
    this._app.use(errorPresentation);
  }

  public get app(): Express {
    return this._app;
  }
}

export default Config;
