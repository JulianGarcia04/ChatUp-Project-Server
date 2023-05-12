import { type IController, parserString } from 'common/infrastructure';
import { type Request, type Response, type NextFunction } from 'express';
import { getAllTasksUseCase, toJSONTask } from 'src/container';

class FindTasks implements IController {
  execute(req: Request, res: Response, next: NextFunction): void {
    const { limit, skip, search, filters } = req.query;
    getAllTasksUseCase
      .execute({
        limit: parserString(String(limit)),
        skip: parserString(String(skip)),
        search: parserString(String(search)),
        filter: filters,
      })
      .then(tasks => {
        const toJSONTasks = tasks.map(task => toJSONTask.execute(task));
        res.status(200).json(toJSONTasks);
      })
      .catch(err => {
        next(err);
      });
  }
}

export default FindTasks;
