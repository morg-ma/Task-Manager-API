import { tasks } from "../models/models";
import { db } from "../config/db";
import { eq } from "drizzle-orm";

export const getTasks = async () => {
    return await db.select().from(tasks);
}

export const getTaskById = async (id: number) => {
    return await db.select().from(tasks).where(eq(tasks.id, id));
}

export const createTask = async (task: typeof tasks.$inferInsert) => {
    return await db.insert(tasks).values(task);
}

export const updateTask = async (id: number, task: typeof tasks.$inferInsert) => {
    return await db.update(tasks).set(task).where(eq(tasks.id, id));
}

export const deleteTask = async (id: number) => {
    return await db.delete(tasks).where(eq(tasks.id, id));
}
