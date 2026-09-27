# AP 1.2b — Fastify API (clean scaffold)

| | |
| --- | --- |
| Status | als Nächstes |
| Issue | [#38](https://github.com/ktauchert/dev-companion/issues/38) |
| Branch | `ap-1-2b-fastify-scaffold` |
| Fertig wenn | Nest-Scaffold entfernt; Fastify läuft mit `GET /health` |
| Voraussetzung | AP 1.1 Monorepo; AP 1.2 optional (DB kommt in 1.3) |

## Ziel

`apps/api` neu als **Fastify + TypeScript** — ohne Nest-Code zu portieren. Der AP-1.1-Nest-Scaffold ist Wegwerf-Material ([ADR-004](../../../adr/ADR-004-FASTIFY-API.md)).

## Vorgehen (clean start)

1. Nest-Dateien und -Dependencies in `apps/api` **löschen** (nicht refactoren).
2. Layout neu anlegen:

```text
apps/api/src/
  server.ts       # Fastify bootstrap, listen
  routes/         # HTTP handlers (z. B. health.ts)
  services/       # Domain-Orchestrierung (später)
  providers/      # Externe Adapter (später, ADR-002)
  db/             # Drizzle-Client-Anbindung (ab AP 1.3)
  types/          # API-spezifische Typen
```

3. `GET /health` → z. B. `{ "ok": true }`.
4. Root-Scripts `dev:api` / `build` an Fastify anpassen.
5. Mindestens ein Vitest-Test für die Health-Route.

## Nicht in diesem AP

Drizzle, Auth, Domain-Packages, CORS für die SPA (reicht in 1.4), CI (1.8).

## Nachweis

* `npm run dev:api` startet Fastify auf Port **3000**
* `curl localhost:3000/health` → OK
* Keine `@nestjs/*`-Dependencies mehr in `apps/api/package.json`

## Weiterlesen

[ADR-004](../../../adr/ADR-004-FASTIFY-API.md) · [tech-stack.md](../../../architecture/tech-stack.md) · [Fastify Docs](https://fastify.dev/docs/latest/)
