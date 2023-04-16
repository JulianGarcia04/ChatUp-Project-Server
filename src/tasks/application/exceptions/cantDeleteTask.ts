import { ExceptionImplementation } from 'common/domain/implementations';

class CantDeleteTask extends ExceptionImplementation {
  constructor() {
    super({
      code: 500,
      name: 'Cant delete task',
      message: 'Error in the repository',
      stack: 'Please check the repository or database',
    });
  }
}

export default CantDeleteTask;
