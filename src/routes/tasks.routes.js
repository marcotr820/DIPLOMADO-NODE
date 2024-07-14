import { Router } from 'express';
import tasksController from '../controllers/tasksController.js';

const router = Router();

router.route('/')
   .get(tasksController.getTasks)
   .post(tasksController.createTask);

router.route('/:id')
   .get(tasksController.getTask)
   .put(tasksController.updateTask)
   .delete(tasksController.deleteTask)
   .patch(tasksController.taskDone)

export default router;