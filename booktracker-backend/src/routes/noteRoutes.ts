import { Elysia } from "elysia";
import { db } from "../db/index";
import { v4 as uuidv4 } from "uuid";
import { notes } from "../models/notes";
import { eq } from "drizzle-orm";
import { createNoteSchema, updateNoteSchema, noteParamsSchema } from "../schemas/noteSchema";

export const noteRoutes = new Elysia()
  // Get all notes for a book
  .get("/books/:id/notes", async ({ params, set }) => {
    try {
      const { id: bookId } = noteParamsSchema.pick({ id: true }).parse(params);
      const bookNotes = await db.select().from(notes).where(eq(notes.bookId, bookId));
      return { success: true, data: bookNotes, message: "Notes fetched successfully" };
    } catch (error) {
      set.status = 400;
      return { error: error instanceof Error ? error.message : "Invalid request" };
    }
  })

  // Add a note to a book
  .post("/books/:id/notes", async ({ params, body, set }) => {
    try {
      const { id: bookId } = noteParamsSchema.pick({ id: true }).parse(params);
      const validatedBody = createNoteSchema.parse(body);

      const newNote = {
        id: uuidv4(),
        bookId,
        content: validatedBody.content,
        createdAt: new Date(),
      };
      await db.insert(notes).values(newNote);
      set.status = 201;
      return { success: true, data: newNote, message: "Note added successfully" };
    } catch (error) {
      set.status = 400;
      return { error: error instanceof Error ? error.message : "Invalid input" };
    }
  })

  // Update a note by ID
  .put("/notes/:id", async ({ params, body, set }) => {
    try {
      const { id } = noteParamsSchema.pick({ id: true }).parse(params);
      const validatedBody = updateNoteSchema.parse(body);

      const [updatedNote] = await db.update(notes)
        .set(validatedBody)
        .where(eq(notes.id, id))
        .returning();

      if (!updatedNote) {
        set.status = 404;
        return { error: "Note not found" };
      }
      return { success: true, data: updatedNote, message: "Note updated successfully" };
    } catch (error) {
      set.status = 400;
      return { error: error instanceof Error ? error.message : "Invalid input" };
    }
  })

  // Delete a note by ID
  .delete("/notes/:id", async ({ params, set }) => {
    try {
      const { id } = noteParamsSchema.pick({ id: true }).parse(params);
      const deletedCount = await db.delete(notes).where(eq(notes.id, id));
      if (!deletedCount) {
        set.status = 404;
        return { error: "Note not found" };
      }
      return { success: true, message: "Note deleted successfully" };
    } catch (error) {
      set.status = 400;
      return { error: error instanceof Error ? error.message : "Invalid request" };
    }
  });
