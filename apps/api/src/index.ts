import type { FastifyInstance } from "fastify";

import { authRoute } from "./routes/auth.js";
import { healthRoute } from "./routes/health.js";

export async function routes(fastify: FastifyInstance) {
  await fastify.register(healthRoute);
  await fastify.register(authRoute);
}
