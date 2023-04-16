import { ExceptionImplementation } from 'common/domain/implementations';

class TaskDuplicate extends ExceptionImplementation {
  constructor() {
    super({
      code: 500,
      name: 'The task is duplicate',
      message: 'One task in the database is duplicate',
      stack:
        'please check the id and change the same. please check the database',
    });
  }
}

export default TaskDuplicate;
