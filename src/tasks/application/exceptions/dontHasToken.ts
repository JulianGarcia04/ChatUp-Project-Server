import { Exception } from 'tasks/domain';

class DontHasToken extends Exception {
  constructor() {
    super({
      code: 403,
      name: 'please sign in',
      message: 'dont has the token',
      stack: 'dont has the token, please sign in',
    });
  }
}

export default DontHasToken;
