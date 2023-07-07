import { ExceptionImplementation } from 'src/common';

class PropertyIsNull extends ExceptionImplementation {
  constructor(key: string) {
    super({
      code: 406,
      name: 'Not Acceptable',
      message: `the ${key} is null or undefined`,
      cause: `please check what is the data that you is sending`,
    });
  }
}

export default PropertyIsNull;
