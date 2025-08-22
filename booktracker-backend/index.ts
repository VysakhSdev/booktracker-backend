import { Elysia } from "elysia";
import dotenv from "dotenv";
import { noteRoutes } from "./src/routes/noteRoutes";
import { bookRoutes } from "./src/routes/bookRoute";

dotenv.config();

const app = new Elysia()
  .get("/", () => ({ message: "BookTracker API is running!" }))
  .use(bookRoutes) 
  .use(noteRoutes) 
  .listen(3000);

console.log(`Server running at http://localhost:3000`);
