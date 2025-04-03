import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { tasks } from "../models/models";
import { db } from "../config/db.config";
import { and, eq } from "drizzle-orm";

export const taskInsertSchema = createInsertSchema(tasks);
export const taskUpdateSchema = createUpdateSchema(tasks);
export const taskIdExists = async (taskId: number, userId: string) => {
    const result = await db
        .select()
        .from(tasks)
        .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)));
    return result.length > 0;
};
