import { Router } from 'express';
import { createTaskController, findTasksController } from 'src/container';

const router = Router();

router.get('/tasks', findTasksController.execute);

router.post('/tasks/create', createTaskController.execute);

export default router;
