import express, { type Express } from 'express';
import config from './config';

abstract class Config {
  private readonly _app: Express = express();
  constructor() {
    this._app.set('PORT', config.PORT);
    this._app.get('/', (req, res) => {
      res.send(config.ENVIROMENT);
    });
  }

  public get app(): Express {
    return this._app;
  }
}

export default Config;
