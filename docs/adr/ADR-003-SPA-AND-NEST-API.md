# ADR-003: Two apps — Vite SPA with TanStack Router, NestJS API

## Status

Accepted

This record replaces the earlier, web-only wording of ADR-003. The decision is the **application split**, not a frontend library in isolation.

## Context

ADR-001 is a modular monolith with two runnable apps: web (UI) and API (orchestration and domain). Early stack notes listed **Next.js** and **NestJS** as generated defaults, without a review.

Dev-Companion is an authenticated product (dashboard, wizard, documents), not a marketing site. Hosting starts on Render, not Vercel.

Next.js (App Router, RSC, Server Actions, Route Handlers) would be a **second server** next to Nest: domain and HTTP would blur. TanStack Start (Router + Vite + server functions) has the same risk if those functions own business rules.

NestJS was never challenged the way Next.js was. It is still an architectural choice: what runs the API process.

## Decision

Two applications:

1. **`apps/web`** — Vite + React **SPA**, routed with **TanStack Router**. UI, client state, client routing. No domain logic, auth rules, or persistence.
2. **`apps/api`** — **NestJS**. HTTP, auth handling, application orchestration, domain modules, provider adapters (ADR-002).

The web app calls the API. There is one backend.

TanStack Router is only routing (URLs, params, type-safe links). **Vite** compiles, serves, and bundles. Webpack/Rsbuild would work; they add nothing here. TanStack Start is not used.

Tailwind CSS and shadcn/ui stay the UI kit. `apps/web` **is** the workspace package — do not nest a generated app inside it.

## Why NestJS (not only “it was in the list”)

Nest fits the split we actually want: one TypeScript API, modules that can track domain boundaries, DI for replacing LLM/auth/storage adapters.

**Fastify or Hono** would be thinner. We would invent module layout and provider wiring ourselves. No current pain justifies ripping out the AP 1.1 Nest scaffold for that.

**One Next.js server** (no Nest) was rejected: it recreates the dual-backend problem or collapses the monolith into a framework we already dropped for the UI.

## Benefits

* One backend; providers stay behind the API (ADR-002)
* UI can be static (or a simple Node static host) plus the API, including on Render
* Type-safe routing without RSC/caching complexity
* Nest modules can grow with ideation / documents / progress without a second HTTP stack

## Consequences

* Two processes locally (`dev:web` / `dev:api`), two ports
* SPA first paint and SEO of app routes are typical of a logged-in tool — accepted
* SSR later (e.g. TanStack Start) only if needed, still **without** moving domain logic out of Nest
* Nest’s ceremony (modules, decorators) is the cost of that structure

## Alternatives considered

* **Next.js as web (and maybe API)** — rejected: second backend or no Nest split
* **TanStack Start** — rejected for now: extra server layer
* **Hono / Fastify instead of Nest** — rejected for now: less structure, rewrite of AP 1.1 without a failing constraint
