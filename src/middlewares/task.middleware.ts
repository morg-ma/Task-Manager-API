import { NextFunction, Request, Response } from "express";
import {
  taskIdExists,
  taskInsertSchema,
  taskUpdateSchema,
} from "../validations/task.validation";
import { fromZodError, ValidationError } from "zod-validation-error";

export const validateTaskId = async (
  req: Request<{ id: number }>,
  res: Response<{ errorMessage: string }>,
  next: NextFunction
) => {
  try {
    const taskId = Number(req.params.id);
    const userId = req.user.id;
    if (!taskId) throw new Error("Task ID is required!");

    if (isNaN(Number(taskId))) throw new Error("Task ID must be a number!");
    if (!(await taskIdExists(taskId, userId)))
      return res.status(404).json({ errorMessage: "Task not found!" });
    next();
  } catch (err: any) {
    return res.status(400).json(err.message);
  }
};

export const validateInsertTask = async (
  req: Request,
  res: Response<ValidationError>,
  next: NextFunction
) => {
  try {
    const task = req.body;
    task.userId = req.user.id;
    const parsedTask = await taskInsertSchema.safeParseAsync(task);
    if (!parsedTask.success) throw fromZodError(parsedTask.error);
    req.body.task = parsedTask.data;
    next();
  } catch (err: any) {
    return res.status(400).json(err);
  }
};

export const validateUpdateTask = async (
  req: Request,
  res: Response<ValidationError | { errorMessage: string }>,
  next: NextFunction
) => {
  try {
    const task = req.body;
    const taskId = Number(req.params.id);
    const userId = req.user.id;
    task.userId = userId;
    if (!taskId) throw new Error("Task ID is required!");

    if (isNaN(Number(taskId))) throw new Error("Task ID must be a number!");

    if (!(await taskIdExists(taskId, userId)))
      return res.status(404).json({ errorMessage: "Task not found!" });

    const parsedTask = await taskUpdateSchema.safeParseAsync(task);
    if (!parsedTask.success) throw fromZodError(parsedTask.error);
    req.body.task = parsedTask.data;
    next();
  } catch (err: any) {
    return res.status(400).json(err);
  }
};
