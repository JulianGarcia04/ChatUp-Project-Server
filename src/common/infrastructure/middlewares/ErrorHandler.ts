import { type ErrorRequestHandler } from 'express';
import config from 'src/config';
import { toJSONException, toDomainException } from 'src/container';

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
  if (config.ENVIROMENT === 'development') {
    const error = toJSONException.execute(toDomainException.execute(err));
    console.log(error);
    res.status(error.code).json({
      name: error.name,
      message: error.message,
      cause: error.cause,
    });
  }
};
