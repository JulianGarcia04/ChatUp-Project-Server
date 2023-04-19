import express, { type Express } from 'express';
import config from './config';
import { CreateTask } from 'tasks/application';
import { v4 } from 'uuid';
import { oneTask, createTask } from 'tasks/infrastructure/repositories';
import { ExceptionImplementation } from 'common';

abstract class Config {
  private readonly _app: Express = express();
  constructor() {
    this._app.set('PORT', config.PORT);
    this._app.use(express.json());
    this._app.post('/', (req, res) => {
      const { title, description, isReady } = req.body;
      new CreateTask(createTask, oneTask)
        .execute({
          id: v4(),
          title,
          description,
          isReady,
        })
        .then(message => {
          res.json(message);
        })
        .catch(e => {
          if (e instanceof ExceptionImplementation) {
            res.status(500).json(e);
          } else {
            console.log(e);
          }
        });
    });
  }

  public get app(): Express {
    return this._app;
  }
}

export default Config;
