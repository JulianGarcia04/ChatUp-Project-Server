import { parser, type IController } from 'common/infrastructure';
import { updateTaskUseCase, toJSONMessage } from 'src/container';
import { type Request, type Response, type NextFunction } from 'express';

class UpdateTask implements IController {
  execute(req: Request, res: Response, next: NextFunction): void {
    const body = req.body;
    const { id } = req.params;
    updateTaskUseCase
      .execute({ id: parser(id), body })
      .then(result => {
        const message = toJSONMessage.execute(result);
        res.status(message.code).json({ message: message.message });
      })
      .catch(err => {
        next(err);
      });
  }
}

export default UpdateTask;
