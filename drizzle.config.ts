import { defineConfig } from "drizzle-kit";

import { env } from "@/env";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "mysql",
  out: "./src/server/db/migration",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
