import { type IController } from 'common/infrastructure';
import { type Request, type Response, type NextFunction } from 'express';
import { createTaskUseCase, toJSONMessage } from 'src/container';
import { v4 } from 'uuid';

class CreateTask implements IController {
  execute(req: Request, res: Response, next: NextFunction): void {
    const { title, description, isReady } = req.body;
    createTaskUseCase
      .execute({
        id: v4(),
        title,
        description,
        isReady,
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
