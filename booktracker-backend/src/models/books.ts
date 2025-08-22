import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: uuid("id").defaultRandom().primaryKey(),   
  title: text("title").notNull(),            
  author: text("author").notNull(),             
  status: text("status")
    .$type<"not_started" | "in_progress" | "finished">()
    .notNull(),                                
  createdAt: timestamp("created_at").defaultNow().notNull(), 
});
