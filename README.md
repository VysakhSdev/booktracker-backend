# 📚 BookTracker Backend

A lightweight backend API built with [ElysiaJS](https://elysiajs.com), [Bun](https://bun.sh), [Zod](https://zod.dev), and [Drizzle ORM](https://orm.drizzle.team) using PostgreSQL. This app allows users to manage a personal reading journal with books and notes.

---

## Features

* Fast runtime with Bun
* RESTful API with ElysiaJS
* Input validation using Zod
* PostgreSQL database powered by Drizzle ORM
* Manage Books and Notes with full CRUD support

---

## Tech Stack

* **Runtime**: Bun
* **Framework**: ElysiaJS
* **Validation**: Zod
* **ORM**: Drizzle
* **Database**: PostgreSQL

---

## Step-by-Step Setup Instructions

### 1. Clone Your Repository

```bash
git clone https://github.com/VysakhSdev/booktracker-backend.git
cd booktracker-backend
```

> This clones your repository directly.

---

### 2. Install Dependencies

Make sure you have [Bun](https://bun.sh) installed. Then run:

```bash
bun install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add your PostgreSQL credentials and port:

```env
DATABASE_URL=postgres://postgres:Vysakh@123@localhost:5432/booktracker
```

---

### 4. Set Up the Database

Ensure PostgreSQL is running. Create the database if it doesn’t exist:

```bash
psql -U postgres
CREATE DATABASE booktracker;
\q
```

---

### 5. Run Database Migrations

```bash
bun run migrate
```

This will create tables for **Books** and **Notes**.

---

### 6. Start the Server

```bash
bun dev
```

The server will run at `http://localhost:3000`.

---

### 7. API Endpoints

#### **Books**

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | /books      | List all books    |
| GET    | /books/\:id | Get a single book |
| POST   | /books      | Add a new book    |
| PUT    | /books/\:id | Update a book     |
| DELETE | /books/\:id | Delete a book     |

#### **Notes**

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | /notes/\:id | Get a single note |
| POST   | /notes      | Add a new note    |
| PUT    | /notes/\:id | Update a note     |
| DELETE | /notes/\:id | Delete a note     |

---

### 8. Drop Database / Reset Data (Optional)

```bash
psql -U postgres -d booktracker
```

Then run:

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

Re-run migrations:

```bash
bun run migrate
```

> ⚠️ This will delete all data. Use only for development.

---

### 9. Testing the API

Use [Postman](https://www.postman.com/) to test endpoints.
Example: `http://localhost:3000/books`

---

### 10. .env Example

```env
DATABASE_URL=postgres://postgres:Vysakh@123@localhost:5432/booktracker
```
