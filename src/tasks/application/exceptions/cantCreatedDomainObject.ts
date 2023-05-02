import { ExceptionImplementation } from 'common/domain/implementations';

class CantCreatedDomainObject extends ExceptionImplementation {
  constructor() {
    super({
      code: 500,
      name: 'Error to create task',
      message: 'Error when try to create domain object',
      cause: 'please check the domain layer or check the use case logic',
    });
  }
}

export default CantCreatedDomainObject;
