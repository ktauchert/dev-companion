import { defineConfig } from "drizzle-kit";
import { getDatabaseUrl } from "./src/env.js";

export default defineConfig({
  dialect: "postgresql",
  schema: ["../auth/auth-schema.ts", "./src/db/schema-tables.ts"],
  out: "./drizzle",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
