
import dotenv from "dotenv";
import pg from "pg";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Find the exact location of this file.
const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

// Load .env from the backend folder.
const envFile = path.resolve(currentDirectory, "../../.env");
const envResult = dotenv.config({ path: envFile });

// Show whether the .env file was found.
console.log("Environment file:", envFile);
console.log(
  "Environment file loaded:",
  !envResult.error
);

// Show whether the password exists, without revealing it.
console.log(
  "DB_PASSWORD loaded:",
  Boolean(process.env.DB_PASSWORD)
);

// Create the PostgreSQL connection pool.
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || "quickkart",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
});

// Export the pool so server.js and API routes can use it.
export default pool;