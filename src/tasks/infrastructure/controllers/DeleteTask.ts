import { type IController } from 'common/infrastructure';
import { type Request, type Response, type NextFunction } from 'express';
import { deleteTaskUseCase } from 'src/container';

class DeleteTask implements IController {
  execute(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params;
    deleteTaskUseCase
      .execute({ id })
      .then(message => {
        res.status(message.code).json({ message: message.message });
      })
      .catch(err => {
        next(err);
      });
  }
}

export default DeleteTask;
