import { ExceptionImplementation } from 'common/implementations';

class CantUpdateData extends ExceptionImplementation {
  constructor() {
    super({
      code: 500,
      name: 'State couldnt changed',
      message: 'Error in the repository',
      stack: 'Please check the repository or database',
    });
  }
}

export default CantUpdateData;
