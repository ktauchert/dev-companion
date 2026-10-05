import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const repoRoot = path.resolve(packageRoot, "../..");

dotenv.config({ path: path.join(repoRoot, ".env") });

export function getDatabaseUrl(): string {
  const override = process.env.DATABASE_URL;
  if (override && override !== "") {
    return override;
  }

  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_HOST;
  const port = process.env.POSTGRES_PORT;
  const database = process.env.POSTGRES_DB;

  if (!user || !password || !host || !port || !database) {
    throw new Error(
      "Missing POSTGRES_* env vars. Copy .env.example to .env in the repo root.",
    );
  }

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}
