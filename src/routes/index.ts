import { Router } from "express";
import taskRouter from './task.route';
import { isAuthenticated } from "../middlewares/auth.middleware";

const router = Router();

router.use('/api/tasks', isAuthenticated, taskRouter);

export default router;