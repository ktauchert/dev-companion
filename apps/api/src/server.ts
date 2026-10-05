import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./index.js";

const webOrigin = process.env.WEB_ORIGIN ?? "http://localhost:5173";

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: [webOrigin],
  credentials: true,
});

await fastify.register(routes);

const port = Number(process.env.API_PORT ?? 3141);

try {
  await fastify.listen({ port, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
