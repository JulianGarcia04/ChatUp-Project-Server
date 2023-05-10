import { type IController } from 'common/infrastructure';
import { type Request, type Response, type NextFunction } from 'express';
import { createTaskUseCase, toJSONMessage } from 'src/container';
import validator from '../validator';
import { v4 } from 'uuid';

class CreateTask implements IController {
  execute(req: Request, res: Response, next: NextFunction): void {
    const body = req.body;
    const task = validator.parse(body);
    createTaskUseCase
      .execute({
        ...task,
        id: task.id ?? v4(),
      })
      .then(resPromise => {
        const message = toJSONMessage.execute(resPromise);
        res.status(message.code).json({ message: message.message });
      })
      .catch(e => {
        next(e);
      });
  }
}

export default CreateTask;
