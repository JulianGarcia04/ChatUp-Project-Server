import { type toModel } from 'common';
import { type Messsage, type Exception } from 'common/domain';

export class ToJSONMessage implements toModel<Messsage, Messsage> {
  execute({ code, message }: Messsage): Messsage {
    return {
      code,
      message,
    };
  }
}

export class ToJSONException implements toModel<Exception, Exception> {
  execute({ code, name, message, cause, stack }: Exception): Exception {
    return {
      code,
      name,
      message,
      cause,
      stack,
    };
  }
}
