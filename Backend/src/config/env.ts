import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || "admin",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "password123",
};
