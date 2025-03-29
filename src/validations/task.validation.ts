import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { tasks } from "../models/models"
import { db } from "../config/db";
import { eq } from "drizzle-orm";

export const taskInsertSchema = createInsertSchema(tasks);
export const taskUpdateSchema = createUpdateSchema(tasks);
export const taskIdExists = async (taskId: number, userId: string) => {
    return await db.select().from(tasks).where(eq(eq(tasks.id, taskId), eq(tasks.userId, userId)));
}