import { defineConfig } from "drizzle-kit";

import { env } from "@/env";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  // dialect: "mysql",  "mysql" | "sqlite" | "postgresql"
  out: "./src/server/db/migration",
  driver: "mysql2",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
});
