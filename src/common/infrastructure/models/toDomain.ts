import { type toModel } from '../interfaces';
import { type Exception, ExceptionImplementation } from 'common';

export class ToDomainException implements toModel<Exception> {
  execute(props: unknown): Exception {
    const err = props as Exception;
    const exception = new ExceptionImplementation(err);
    return exception;
  }
}
