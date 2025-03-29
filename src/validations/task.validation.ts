import { createInsertSchema, createUpdateSchema } from "drizzle-zod"
import { tasks } from "../models/models"
import { db } from "../config/db";
import { eq } from "drizzle-orm";

export const taskInsertSchema = createInsertSchema(tasks);
export const taskUpdateSchema = createUpdateSchema(tasks);
export const taskIdExists = async (id: number) => {
    return await db.select().from(tasks).where(eq(tasks.id, id));
}