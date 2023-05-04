import { type toModel } from '../interfaces';
import { type Exception, ExceptionImplementation } from 'src/common';

export class ToDomainException implements toModel<unknown, Exception> {
  execute(props: unknown): Exception {
    const err = props as Exception;
    const exception = new ExceptionImplementation(err);
    return exception;
  }
}
