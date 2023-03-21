import { Exception } from 'tasks/domain';

class IncorrectId extends Exception {
  constructor() {
    super({
      code: 500,
      name: 'error in the server',
      message: 'error with id',
      stack: 'the id is incorrect, please check the id',
    });
  }
}

export default IncorrectId;
