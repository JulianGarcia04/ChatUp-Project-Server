import { ExceptionImplementation } from 'common/domain/implementations';

class CantBeSaved extends ExceptionImplementation {
  constructor(prop: string) {
    super({
      code: 406,
      name: 'Not Acceptable',
      message: `the ${prop} cant be empty`,
      cause: `please check the request and change the ${prop} data`,
    });
  }
}

export default CantBeSaved;
