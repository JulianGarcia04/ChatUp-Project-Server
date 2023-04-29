import { type IController } from 'common/infrastructure';
import { type Request, type Response, type NextFunction } from 'express';
import { getAllTasksUseCase } from 'src/container';

class FindTasks implements IController {
  execute(req: Request, res: Response, next: NextFunction): void {
    const { limit, skip, search, filters } = req.query;
    console.log(req.query);
    getAllTasksUseCase
      .execute({
        limit: parseInt(limit as string),
        skip: parseInt(skip as string),
        search: String(search),
        filter: filters,
      })
      .then(tasks => {
        res.status(200).json(tasks);
      })
      .catch(err => {
        next(err);
      });
  }
}

export default FindTasks;
