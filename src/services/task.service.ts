import { tasks, users } from "../models/models";
import { db } from "../config/db";
import { eq } from "drizzle-orm";

export const getTasks = async (userId: string) => {
    return await db.select().from(tasks).where(eq(users.id, userId));
}

export const getTaskById = async (taskId: number, userId: string) => {
    return await db.select().from(tasks).where(eq(eq(tasks.id, taskId), eq(users.id, userId)));
}

export const createTask = async (task: typeof tasks.$inferInsert) => {
    return await db.insert(tasks).values(task);
}

export const updateTask = async (taskId: number, userId: string, task: typeof tasks.$inferInsert) => {
    return await db.update(tasks).set(task).where(eq(eq(tasks.id, taskId), eq(users.id, userId)));
}

export const deleteTask = async (taskId: number, userId: string) => {
    return await db.delete(tasks).where(eq(eq(tasks.id, taskId), eq(users.id, userId)));
}
