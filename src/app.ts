import express, { Express } from 'express';
import config from './config';

abstract class Config {
  private _app: Express = express();
  constructor() {
    this._app.set('PORT', config.PORT);
  }

  public get app(): Express {
    return this._app;
  }
}

export default Config;
