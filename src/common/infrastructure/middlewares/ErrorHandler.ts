import {
  type Request,
  type Response,
  type NextFunction,
  type ErrorRequestHandler,
} from 'express';
import config from 'src/config';
import { toJSONException, toDomainException } from 'src/container';

export const errorInterceptor = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err == null) {
    return;
  }
  next(err);
};

export const errorPresentation = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (config.ENVIROMENT === 'development') {
    const error = toJSONException.execute(toDomainException.execute(err));
    console.log(error);
    res.status(error.code).json(error);
  }
};
