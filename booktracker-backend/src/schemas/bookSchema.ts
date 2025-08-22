import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().default("Unknown Author"),
  status: z.enum(["not_started", "in_progress", "finished"]).default("not_started"),
});

export const updateBookSchema = z.object({
  title: z.string().min(1).optional(),
  author: z.string().optional(),
  status: z.enum(["not_started", "in_progress", "finished"]).optional(),
});

export const bookParamsSchema = z.object({
  id: z.string().uuid("Invalid book ID"),
});
