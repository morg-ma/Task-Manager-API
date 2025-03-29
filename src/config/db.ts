import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import 'dotenv/config';
import * as schema from '../models/models';

const client = postgres(process.env.DATABASE_URL as string);
export const db = drizzle(client, { schema });
