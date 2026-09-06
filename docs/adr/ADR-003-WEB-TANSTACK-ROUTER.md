# ADR-003: Web UI as Vite SPA with TanStack Router

## Status

Accepted

## Context

Early stack notes listed Next.js for `apps/web`. That was a generated default, not a reviewed decision.

The architecture already splits responsibilities:

* Web: UI, interaction, presentation, client-side state
* NestJS API: authentication, endpoints, orchestration, domain coordination

Dev-Companion is an authenticated product (dashboard, wizard, documents), not a content site. Hosting starts on Render, not Vercel.

Next.js (App Router, RSC, Server Actions, Route Handlers) would add a second server-side surface and blur the API boundary. TanStack Start was considered for SSR; it would risk the same duplication if server functions owned domain logic.

## Decision

`apps/web` is a **Vite + React SPA** routed with **TanStack Router**.

It talks to the NestJS API. It does not host domain logic, auth rules, or persistence.

TanStack Router is only routing (URLs, params, type-safe links). It does not compile, serve, or bundle the app.

**Vite** is the build tool: TypeScript/JSX, dev server, HMR, production bundle. Next.js bundled that job into the framework; without Next, something else must do it. Vite is the usual pair for TanStack Router. Webpack or Rsbuild would also work; they add no value here.

TanStack Start = Router + Vite + a server layer. We take Router + Vite only.

Tailwind CSS and shadcn/ui remain the UI kit.

The web app **is** the workspace package (`apps/web`). Do not nest a second app folder inside it (for example `apps/web/dev-companion-fe`).

## Benefits

* One backend: NestJS
* Fits the modular monolith and ADR-002 (providers live behind the API)
* Type-safe routing without RSC/caching complexity
* Vite local development
* Deployable as static assets plus the API, including on Render

## Consequences

* First paint and SEO of app routes are SPA-typical. Acceptable for a logged-in tool.
* SSR can be revisited later (for example TanStack Start) only if a concrete need appears, still without moving domain logic out of NestJS.

## Alternatives considered

* **Next.js** — rejected as overkill and a second backend
* **TanStack Start** — rejected for now to keep a single server
