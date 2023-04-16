import { ExceptionImplementation } from 'common/domain/implementations';

class SkipMustBeGreatEqualThanToZero extends ExceptionImplementation {
  constructor() {
    super({
      code: 406,
      name: 'The skip prop is invalid',
      message: 'The skip prop mustnt to less than zero',
      stack: 'please should to give me a number great equal than to zero',
    });
  }
}

export default SkipMustBeGreatEqualThanToZero;
