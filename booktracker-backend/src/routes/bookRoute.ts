import { Elysia } from "elysia";
import { db } from "../db/index";
import { eq } from "drizzle-orm";
import { books, type NewBook } from "../models/books";
import {
  createBookSchema,
  updateBookSchema,
  bookParamsSchema,
} from "../schemas/bookSchema";

export const bookRoutes = new Elysia()
  // Get all books
  .get("/books", async ({ set }) => {
    try {
      const allBooks = await db.select().from(books);
      return {
        success: true,
        data: allBooks,
        message: "Books fetched successfully",
      };
    } catch (error) {
      set.status = 500;
      return { error: "Failed to fetch books" };
    }
  })

  // Get a single book by ID
  .get("/books/:id", async ({ params, set }) => {
    try {
      const { id } = bookParamsSchema.parse(params);

      if (!id) {
        set.status = 400;
        return { error: "Book ID is required" };
      }

      const book = await db.select().from(books).where(eq(books.id, id));
      if (!book.length) {
        set.status = 404;
        return { error: "Book not found" };
      }

      return {
        success: true,
        data: book[0],
        message: "Book fetched successfully",
      };
    } catch (error) {
      set.status = 400;
      return {
        error: error instanceof Error ? error.message : "Invalid request",
      };
    }
  })

  // Add a new book
  .post("/books", async ({ body, set }) => {
    try {
      const validatedBody = createBookSchema.parse(body);

      const newBook: NewBook = {
        title: validatedBody.title,
        author: validatedBody.author || "Unknown Author",
        status: validatedBody.status || "not_started",
      };

      await db.insert(books).values(newBook);

      set.status = 201;
      return {
        success: true,
        data: newBook,
        message: "Book created successfully",
      };
    } catch (error) {
      set.status = 400;
      return {
        error: error instanceof Error ? error.message : "Invalid input",
      };
    }
  })

  // Update a book by ID
  .put("/books/:id", async ({ params, body, set }) => {
    try {
      const { id } = bookParamsSchema.parse(params);

      if (!id) {
        set.status = 400;
        return { error: "Book ID is required" };
      }

      const validatedBody = updateBookSchema.parse(body);

      const [updatedBook] = await db
        .update(books)
        .set(validatedBody)
        .where(eq(books.id, id))
        .returning();

      if (!updatedBook) {
        set.status = 404;
        return { error: "Book not found" };
      }

      return {
        success: true,
        data: updatedBook,
        message: "Book updated successfully",
      };
    } catch (error) {
      set.status = 400;
      return {
        error: error instanceof Error ? error.message : "Invalid input",
      };
    }
  })

  // Delete a book by ID
  .delete("/books/:id", async ({ params, set }) => {
    try {
      const { id } = bookParamsSchema.parse(params);

      if (!id) {
        set.status = 400;
        return { error: "Book ID is required" };
      }

      const deletedCount = await db.delete(books).where(eq(books.id, id));

      if (!deletedCount) {
        set.status = 404;
        return { error: "Book not found" };
      }

      return { success: true, message: "Book deleted successfully" };
    } catch (error) {
      set.status = 400;
      return {
        error: error instanceof Error ? error.message : "Invalid request",
      };
    }
  });
