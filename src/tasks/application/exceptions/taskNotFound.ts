import { ExceptionImplementation } from 'common/domain/implementations';

class TaskNotFound extends ExceptionImplementation {
  constructor() {
    super({
      code: 404,
      name: 'Task no found',
      message: 'the id is incorrect',
      stack: 'the id is incorrect, wasnt found the task',
    });
  }
}

export default TaskNotFound;
