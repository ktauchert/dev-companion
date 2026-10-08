import { drizzle } from "drizzle-orm/node-postgres";
import { getDatabaseUrl } from "./env.js";
import { relations } from "./relations.js";

export const db = drizzle(getDatabaseUrl(), { relations });

export { getDatabaseUrl } from "./env.js";
export { relations } from "./relations.js";
export * from "./schema.js";
