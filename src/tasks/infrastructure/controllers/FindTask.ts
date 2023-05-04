import { type Request, type Response, type NextFunction } from 'express';
import { findTaskUseCase, toJSONTask } from 'src/container';
import { type IController } from 'src/common';

class FindTask implements IController {
  execute(req: Request, res: Response, next: NextFunction): void {
    const { id } = req.params;
    findTaskUseCase
      .execute({ id })
      .then(result => {
        const task = toJSONTask.execute(result);
        res.status(202).json(task);
      })
      .catch(err => {
        next(err);
      });
  }
}

export default FindTask;
