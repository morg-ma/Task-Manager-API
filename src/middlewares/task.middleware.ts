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
): Promise<void> => {
  try {
    const taskId = Number(req.params.id);
    const userId = req.user.id;
    if (!taskId) throw new Error("Task ID is required!");

    if (isNaN(Number(taskId))) throw new Error("Task ID must be a number!");
    if (!(await taskIdExists(taskId, userId))) {
      res.status(404).json({ errorMessage: "Task not found!" });
      return;
    }
    next();
  } catch (err: any) {
    res.status(400).json(err.message);
    console.log(err);
    return;
  }
};

export const validateInsertTask = async (
  req: Request,
  res: Response<ValidationError>,
  next: NextFunction
): Promise<void> => {
  try {
    const task = req.body;
    task.userId = req.user.id;
    const parsedTask = await taskInsertSchema.safeParseAsync(task);
    if (!parsedTask.success) throw fromZodError(parsedTask.error);
    req.body.task = parsedTask.data;
    next();
  } catch (err: any) {
    res.status(400).json(err);
    return;
  }
};

export const validateUpdateTask = async (
  req: Request<{ id: number }>,
  res: Response<ValidationError | { errorMessage: string }>,
  next: NextFunction
): Promise<void> => {
  try {
    const task = req.body;
    const taskId = Number(req.params.id);
    const userId = req.user.id;
    task.userId = userId;
    if (!taskId) throw new Error("Task ID is required!");

    if (isNaN(Number(taskId))) throw new Error("Task ID must be a number!");

    if (!(await taskIdExists(taskId, userId))) {
      res.status(404).json({ errorMessage: "Task not found!" });
      return;
    }
    const parsedTask = await taskUpdateSchema.safeParseAsync(task);
    if (!parsedTask.success) throw fromZodError(parsedTask.error);
    req.body.task = parsedTask.data;
    next();
  } catch (err: any) {
    res.status(400).json(err);
    console.log(err);
    return;
  }
};

export const validateQueryParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, dueDate, page, pageSize } = req.query;
    if (
      status &&
      !["pending", "in_progress", "completed"].includes(status as string)
    )
      throw new Error("Invalid status!");
    if (dueDate && isNaN(Date.parse(dueDate as string)))
      throw new Error("Invalid due date!");
    if (page && (isNaN(Number(page)) || Number(page) < 1))
      throw new Error("Page must be a number and greater than 0!");
    if (pageSize && (isNaN(Number(pageSize)) || Number(pageSize) < 1))
      throw new Error("Page size must be a number and greater than 0!");
    next();
  } catch (err: any) {
    res.status(400).json(err);
    return;
  }
};
