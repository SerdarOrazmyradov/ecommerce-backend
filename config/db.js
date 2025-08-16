import pg from "pg";
import "dotenv/config";

export const db = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // user: process.env.DB_USER,

  // host: process.env.DB_HOST,

  // database: process.env.DB_NAME,

  // password: process.env.DB_PASSWORD,

  // port: process.env.DB_PORT,
});

db.connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
