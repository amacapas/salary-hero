import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config();

const pgDB = pgPromise({});

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};

const db = pgDB(config);

export { db };
