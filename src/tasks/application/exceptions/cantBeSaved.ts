import { ExceptionImplementation } from 'common/domain/implementations';

class CantBeSaved extends ExceptionImplementation {
  constructor() {
    super({
      code: 500,
      name: 'Error to save the task',
      message: 'Error when try to save the task in the database',
      stack: 'please check the repository or check the database connection',
    });
  }
}

export default CantBeSaved;
