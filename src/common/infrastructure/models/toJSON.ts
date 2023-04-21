import { type toModel } from 'common';
import { type Messsage, type Exception } from 'common/domain';

class ToJSONMessage implements toModel<Messsage> {
  execute({ code, message }: Messsage): Messsage {
    return {
      code,
      message,
    };
  }
}

class ToJSONException implements toModel<Exception> {
  execute({ code, name, message, stack }: Exception): Exception {
    return {
      code,
      name,
      message,
      stack,
    };
  }
}

export const toJSONMessage = new ToJSONMessage();

export const toJSONException = new ToJSONException();
