import { ExceptionImplementation } from 'common/domain/implementations';

class RequiredParams extends ExceptionImplementation {
  constructor(param: string, ...args: string[]) {
    const stringError = args.reduce((acc, el, idx, arr) => {
      if (idx === arr.length - 1) {
        return acc + ` and the ${el}`;
      }
      return acc + `, the ${el}`;
    }, `You only can change the ${param}`);
    super({
      code: 403,
      name: 'unauthorized',
      message: stringError,
      cause: 'check the request body',
    });
  }
}

export default RequiredParams;
