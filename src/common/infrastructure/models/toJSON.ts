import { type toModel } from 'common';
import { type Messsage, type Exception } from 'common/domain';

export class ToJSONMessage implements toModel<Messsage> {
  execute({ code, message }: Messsage): Messsage {
    return {
      code,
      message,
    };
  }
}

export class ToJSONException implements toModel<Exception> {
  execute({ code, name, message, stack }: Exception): Exception {
    return {
      code,
      name,
      message,
      stack,
    };
  }
}
