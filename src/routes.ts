import { type Express, Router } from 'express';
import RouterTask from 'tasks/infrastructure/routes';

const adminRouter = (app: Express): void => {
  const router = Router();
  app.use('/api/v1', router);
  router.use(RouterTask);
};

export default adminRouter;
