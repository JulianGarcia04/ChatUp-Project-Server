import { type IAllTask } from 'tasks/application';
import { parserFilters } from 'common/infrastructure';
import { toDomainTask } from 'src/container';
import { Task } from '../schemas';
import { type ITask } from 'src/tasks/domain';

class AllTask implements IAllTask {
  async withPaginate(
    skip: number,
    limit: number,
    filter?: unknown,
    search?: string,
  ): Promise<ITask[]> {
    let tasks;
    let baseQuery = {};
    baseQuery = {
      ...baseQuery,
      isDelete: false,
    };
    if (search != null) {
      baseQuery = {
        ...baseQuery,
        $text: { $search: search },
      };
    }
    if (filter == null) {
      tasks = await Task.find(baseQuery).skip(skip).limit(limit);
      const tasksDomain = tasks.map(task => toDomainTask.execute(task));
      return tasksDomain;
    }
    const filters = filter as any[];
    const objFilters = parserFilters(filters, baseQuery);
    tasks = await Task.find(objFilters).skip(skip).limit(limit);
    const tasksDomain = tasks.map(task => toDomainTask.execute(task));
    return tasksDomain;
  }

  async withoutPaginate(
    filter?: unknown,
    search?: string,
  ): Promise<[] | ITask[]> {
    const filters = filter as any[];
    let baseQuery = {};
    baseQuery = {
      ...baseQuery,
      isDelete: false,
    };
    if (search != null) {
      baseQuery = {
        ...baseQuery,
        $text: { $search: search },
      };
    }
    const objFilters = parserFilters(filters, baseQuery);
    const tasks = await Task.find(objFilters);
    const tasksDomain = tasks.map(task => toDomainTask.execute(task));
    return tasksDomain;
  }
}

export default AllTask;
