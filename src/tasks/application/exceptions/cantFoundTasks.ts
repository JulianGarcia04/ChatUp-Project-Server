import { ExceptionImplementation } from 'common/domain/implementations';

class CantFoundTasks extends ExceptionImplementation {
  constructor() {
    super({
      code: 404,
      name: 'Dont has tasks',
      message: 'Dont has tasks in the database',
      cause:
        'Check the database if has data, or check the repository logic is correct',
    });
  }
}

export default CantFoundTasks;
