import { Request, Response } from "express";
import * as taskServices from "../services/task.service";

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const tasks = await taskServices.getTasks(userId);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getTaskById = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        const task = await taskServices.getTaskById(taskId, userId);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = req.body.task;
        const newTask = await taskServices.createTask(task);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateTask = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        const task = req.body.task;
        const updatedTask = await taskServices.updateTask(taskId, userId, task);
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteTask = async (req: Request<{ id: number }>, res: Response) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        await taskServices.deleteTask(taskId, userId);
        res.status(204).send();
    } catch (err) {
        res.status(500).json(err);
    }
}