import { ExceptionImplementation } from 'common/domain/implementations';

class CantUpdateData extends ExceptionImplementation {
  constructor() {
    super({
      code: 500,
      name: 'State couldnt changed',
      message: 'Error in the repository',
      cause: 'Please check the repository or database',
    });
  }
}

export default CantUpdateData;
