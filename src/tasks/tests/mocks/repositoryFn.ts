import { type ITask } from 'tasks/domain';
import { type toModel } from 'common';

class RepositorysMockFns {
  public tasks: ITask[] = [];
  private readonly toDomainImplementation: toModel<ITask, ITask>;

  constructor(modelToDomain: toModel<ITask, ITask>) {
    this.toDomainImplementation = modelToDomain;
  }

  // mock get all task
  async findAll(filter?: unknown, search?: string): Promise<ITask[]> {
    if (filter == null && search == null) {
      return this.tasks;
    } else if (filter == null && search != null) {
      return this.tasks.filter(taks => taks.title.includes(search));
    }
    // convert type array
    const filters = filter as any[];
    // format the array element
    const formatFilters = filters.map(filter => {
      const key = String(filter[0]);
      return [
        key.startsWith('task') ? key : `task.${key}`,
        filter[1],
        filter[2],
      ];
    });
    // condition string
    let condition: string = '';
    formatFilters.forEach((el, idx, arr) => {
      const key = String(el[0]);
      const logicOperator = String(el[1]);
      const value = String(el[2]);
      const and = arr[idx + 1] != null ? '&&' : '';
      condition = `${condition} ${key}${logicOperator}${value} ${and}`;
    });
    return this.tasks.filter(task => {
      return search == null
        ? eval(condition.trim())
        : eval(`${condition} && ${String(task.title.includes(search))}`.trim());
    });
  }

  async findAllPaginate(
    skip: number,
    limit: number,
    filter?: unknown,
    search?: string,
  ): Promise<ITask[]> {
    if (filter == null && search == null) {
      const skippedArr = this.tasks.slice(skip, skip + limit);
      return skippedArr;
    }
    if (filter == null && search != null) {
      const filterArr = this.tasks.filter(task => task.title.includes(search));
      return filterArr.slice(skip, skip + limit);
    }

    const dataFiltered = await this.findAll(filter, search);

    const skippedArr = dataFiltered.slice(skip, skip + limit);
    return skippedArr;
  }

  // mock find function
  async findFn(id: string | number): Promise<ITask | null> {
    const task = await new Promise((resolve, reject) => {
      const task = this.tasks.find(task => task.id === id);
      resolve(task);
    });

    const isTask: ITask | null =
      task !== undefined ? this.toDomainImplementation.execute(task) : null;
    return isTask;
  }

  // mock create fn
  async createFn(props: ITask): Promise<void> {
    await new Promise((resolve, reject) => {
      resolve(this.tasks.push(props));
    });
  }

  // mock update task function
  async editFn(id: number | string, props: unknown): Promise<void> {
    const index = this.tasks.findIndex(task => task.id === id);
    const data = await new Promise((resolve, reject) => {
      resolve({
        ...this.tasks[index],
        ...(props as ITask),
      });
    });

    const task = this.toDomainImplementation.execute(data);
    this.tasks[index] = task;
  }
}

export default RepositorysMockFns;
