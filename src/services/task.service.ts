import { tasks } from "../models/models";
import { db } from "../config/db.config";
import { and, eq, gte, like } from "drizzle-orm";

export const getTasks = async (userId: string) => {
    return await db.select().from(tasks).where(eq(tasks.userId, userId));
}

export const getTaskById = async (taskId: number, userId: string) => {
    return (await db.select().from(tasks).where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))).at(0);
}

export const createTask = async (task: typeof tasks.$inferInsert) => {
    return await db.insert(tasks).values(task).returning();
}

export const updateTask = async (taskId: number, userId: string, task: typeof tasks.$inferInsert) => {
    return await db.update(tasks).set(task).where(and(eq(tasks.id, taskId), eq(tasks.userId, userId))).returning();
}

export const deleteTask = async (taskId: number, userId: string) => {
    return await db.delete(tasks).where(and(eq(tasks.id, taskId), eq(tasks.userId, userId))).returning();
}

export const getFilteredTasks = async (userId: string, title?: string, status?: string, dueDate?: string, page: number = 1, pageSize: number = 10) => {
    const offset = (page - 1) * pageSize;

    return db
        .select()
        .from(tasks)
        .where(
            and(
                eq(tasks.userId, userId),
                title? like(tasks.title, `${title}%`) : undefined,
                status ? eq(tasks.status, status as "pending" | "in_progress" | "completed") : undefined,
                dueDate ? gte(tasks.createdAt, new Date(dueDate)) : undefined
            )
        )
        .limit(pageSize)
        .offset(offset);
};