import { type ErrorRequestHandler } from 'express';
import config from 'src/config';
import { toJSONException, toDomainException } from 'src/container';
import { ExceptionImplementation } from 'common/domain';

export const errorInterceptor: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
): void => {
  if (err == null) {
    return;
  }
  next(err);
};

export const errorPresentation: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
): void => {
  if (config.ENVIROMENT === 'development' || config.ENVIROMENT === 'test') {
    const error = toJSONException.execute(toDomainException.execute(err));
    console.log(error);
    res.status(error.code).json({
      name: error.name,
      message: error.message,
      cause: error.cause,
    });

    return;
  }

  if (err instanceof ExceptionImplementation) {
    const error = toJSONException.execute(err);
    res.status(error.code).json({
      name: error.name,
      message: error.message,
      cause: error.cause,
    });
    return;
  }

  res.status(500).json({
    name: 'Server Error',
    message: 'Check the console',
    cause: 'Error unknow',
  });
  console.log(err);
};
