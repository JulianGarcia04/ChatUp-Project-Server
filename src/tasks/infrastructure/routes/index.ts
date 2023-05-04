import { Router } from 'express';
import {
  createTaskController,
  findTasksController,
  deleteTaskController,
  updateTaskController,
  findTaskController,
} from 'src/container';

const router = Router();

router.get('/tasks', findTasksController.execute);

router.get('/tasks/:id', findTaskController.execute);

router.post('/tasks/create', createTaskController.execute);

router.put('/tasks/update/:id', updateTaskController.execute);

router.delete('/tasks/delete/:id', deleteTaskController.execute);

export default router;
