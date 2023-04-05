import { type ITask } from 'tasks/domain';
import { type toDomain } from 'common';

class RepositorysMockFns {
  public tasks: ITask[] = [];
  private readonly toDomainImplementation: toDomain<ITask>;

  constructor(modelToDomain: toDomain<ITask>) {
    this.toDomainImplementation = modelToDomain;
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
