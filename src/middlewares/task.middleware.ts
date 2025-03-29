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
    const id = Number(req.params.id);
    if (!id) throw new Error("Task ID is required!");

    if (isNaN(Number(id))) throw new Error("Task ID must be a number!");
    if (!(await taskIdExists(id)))
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
    const id = Number(req.params.id);
    if (!id) throw new Error("Task ID is required!");

    if (isNaN(Number(id))) throw new Error("Task ID must be a number!");

    if (!(await taskIdExists(id)))
      return res.status(404).json({ errorMessage: "Task not found!" });

    const parsedTask = await taskUpdateSchema.safeParseAsync(task);
    if (!parsedTask.success) throw fromZodError(parsedTask.error);
    req.body.task = parsedTask.data;
    next();
  } catch (err: any) {
    return res.status(400).json(err);
  }
};
