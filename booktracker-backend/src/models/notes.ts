import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { books } from "./books";
import type { InferInsertModel } from "drizzle-orm";

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),     
  bookId: uuid("book_id").references(() => books.id).notNull(),
  content: text("content").notNull(),             
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});

export type NewNotes = InferInsertModel<typeof notes>;
