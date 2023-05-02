import { Router } from 'express';
import {
  createTaskController,
  findTasksController,
  deleteTaskController,
} from 'src/container';

const router = Router();

router.get('/tasks', findTasksController.execute);

router.post('/tasks/create', createTaskController.execute);

router.delete('/tasks/delete/:id', deleteTaskController.execute);

export default router;
