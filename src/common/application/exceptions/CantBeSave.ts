import { ExceptionImplementation } from 'src/common';

class CantBeSave extends ExceptionImplementation {
  constructor(entity: string) {
    super({
      code: 500,
      name: 'Internal Server Error',
      message: `the ${entity} cant be save`,
      cause: `please check the database conection or repository`,
    });
  }
}

export default CantBeSave;
