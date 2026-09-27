# ADR-004: Fastify instead of NestJS for the API

## Status

Accepted

Supersedes the **backend framework** part of [ADR-003](ADR-003-SPA-AND-NEST-API.md). ADR-003 remains valid for the **two-app split** (Vite SPA + API).

## Context

AP 1.1 scaffolded `apps/api` with NestJS. ADR-003 chose Nest for module structure and DI.

Since then:

* The product owner prioritises **TypeScript and Node fundamentals** over framework ceremony (job market values TS/API design; Nest is a bonus).
* Nest adds decorators, modules, and DI before core TS and HTTP patterns are solid.
* ADR-003 already noted Fastify as a thinner alternative — rejected then only because the Nest scaffold existed without pain.

PHP (Symfony/Laravel) was considered as a complement for the job market and **deferred**. Dev-Companion stays Node/TS. A later Laravel rebuild of the same product idea remains an optional learning exercise — not a migration plan.

## Decision

**`apps/api` will use Fastify + TypeScript**, not NestJS.

Layout (target):

```text
apps/api/src/
  routes/       # HTTP handlers, validation at the edge
  services/     # domain orchestration (ideation, documents, board-sync)
  providers/    # external adapters (LLM, Git, auth) — ADR-002
  db/           # Drizzle client / queries
  types/        # API-specific types; shared models in packages/shared
```

* **`apps/web`** unchanged: Vite + React SPA + TanStack Router.
* **Domain packages** (`packages/*`) unchanged in intent; imported by services, not tied to Nest modules.
* **Provider boundary** (ADR-002) unchanged: interfaces + adapter implementations.

## Why Fastify

* **Lower ceremony** — learn HTTP, middleware, and layering directly.
* **Good TypeScript story** — schema validation (e.g. `@fastify/type-provider-typebox` or Zod) without decorator magic.
* **Market fit** — “Node/TypeScript API” is the common job description; Fastify is a credible, modern choice.
* **Same deployment model** — one Node process on Render / Docker / On-Prem.
* **Enough structure** — explicit `routes` / `services` / `providers` replaces Nest modules without a container framework.

NestJS is not wrong for this product; it is **the wrong learning and velocity trade-off right now**.

## Benefits

* Faster path to a working PoC while building real TS skill.
* Less framework lock-in in `apps/api`; domain logic stays in `packages/*`.
* Easier to explain in portfolio and interviews (“I built the API layer myself”).
* Aligns with solo-maintainer reality: fewer concepts per feature.

## Consequences

* **Clean scaffold** when implementation is authorised (`code`): remove the Nest AP 1.1 scaffold from `apps/api` and set up Fastify from scratch — **do not port Nest modules or decorators**. Health route as minimal proof. AP 1.1 Nest scaffold is throwaway, not sacred.
* **Structure is conventional, not enforced** — discipline required; document layout in `apps/api/README.md` when scaffolded.
* Phase 1 implementation plans that mention Nest (AP 1.3, 1.4) refer to Fastify from now on.
* [lessons-learned/phase-1/ap1.md](../lessons-learned/phase-1/ap1.md) stays historical (Nest era); do not rewrite history.

## Alternatives considered

* **Keep Nest** — rejected: premature complexity for current goals.
* **Express** — viable; Fastify preferred for performance and modern plugin model. Either is acceptable; pick one, not both.
* **Hono** — viable for edge/serverless; less needed for a classic Render/Docker API.
* **Laravel/Symfony now** — rejected: split focus; revisit as separate learning project after a solid Node PoC.
* **Next.js API routes** — still rejected (ADR-003): blurs UI and backend.

## Implementation note

**Not started.** Repo still contains the Nest AP 1.1 scaffold until AP 1.2b ([#38](https://github.com/ktauchert/dev-companion/issues/38)): delete scaffold, Fastify clean start. See [ap-1.2b-fastify-scaffold.md](../planning/phases/phase1/ap-1.2b-fastify-scaffold.md).
