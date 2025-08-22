import { z } from "zod";

export const createNoteSchema = z.object({
  content: z.string().min(1, "Note content is required"),
});

export const updateNoteSchema = z.object({
  content: z.string().min(1, "Note content is required").optional(),
});

export const noteParamsSchema = z.object({
  id: z.string().uuid("Invalid note ID").optional(),
  bookId: z.string().uuid("Invalid book ID").optional(),
});
