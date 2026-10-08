import type { FastifyInstance } from "fastify";
import { sql } from "drizzle-orm";
import { db } from "@dev-companion/database";

export async function healthRoute(fastify: FastifyInstance) {
  fastify.get("/health", async () => {
    await db.execute(sql`select 1`);

    return {
      status: "ok",
      checks: {
        database: "ok",
      },
    };
  });
}
