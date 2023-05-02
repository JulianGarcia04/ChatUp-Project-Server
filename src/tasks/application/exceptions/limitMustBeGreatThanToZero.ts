import { ExceptionImplementation } from 'common/domain/implementations';

class LimitMustBeGreatThanToZero extends ExceptionImplementation {
  constructor() {
    super({
      code: 406,
      name: 'The limit prop is invalid',
      message: 'The limit prop mustnt to less equal than zero',
      cause: 'please should to give me a number great than to zero',
    });
  }
}

export default LimitMustBeGreatThanToZero;
