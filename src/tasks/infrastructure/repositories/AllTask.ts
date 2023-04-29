import { type IAllTask } from 'tasks/application';
import { Task } from '../schemas';
import { type ITask } from 'src/tasks/domain';
import { parserFilters } from 'common/infrastructure';

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
      return tasks;
    }
    const filters = filter as any[];
    const objFilters = parserFilters(filters, baseQuery);
    console.log(objFilters);
    tasks = await Task.find(objFilters).skip(skip).limit(limit);
    return tasks;
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
    const task = await Task.find(objFilters);
    return task;
  }
}

export default AllTask;
