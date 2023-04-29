import { type Request, type Response, type NextFunction } from 'express';

export interface IController {
  execute(req: Request, res: Response, next?: NextFunction): void;
}
