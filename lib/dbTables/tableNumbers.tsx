import { db } from '../db';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const numbers = pgTable('numbers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  number: integer('string').notNull()
});
export type SelectNumbers = typeof numbers.$inferSelect;

export async function getNumbers(
  search: string,
  offset: number
): Promise<{
  products: SelectNumbers[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(numbers)
        .where(ilike(numbers.number, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalNumbers = await db.select({ count: count() }).from(numbers);
  let moreNumbers = await db.select().from(numbers).limit(5).offset(offset);
  let newOffset = moreNumbers.length >= 5 ? offset + 5 : null;

  return {
    products: moreNumbers,
    newOffset,
    totalProducts: totalNumbers[0].count
  };
}

export async function deleteNumberById(id: number) {
  await db.delete(numbers).where(eq(numbers.id, id));
}
