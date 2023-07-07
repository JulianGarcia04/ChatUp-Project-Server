import { ExceptionImplementation } from 'src/common';

class EntityHasAlreadyBeenCreated extends ExceptionImplementation {
  constructor(entity: string) {
    super({
      code: 400,
      name: 'Bad Request',
      message: `the ${entity} has already been created`,
      cause: `please check what is the data that you is sending`,
    });
  }
}

export default EntityHasAlreadyBeenCreated;
