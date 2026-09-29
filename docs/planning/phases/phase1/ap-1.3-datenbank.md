# AP 1.3 — Datenbank & Auth

| | |
| --- | --- |
| Status | nach 1.2b |
| Issue | [#3](https://github.com/ktauchert/dev-companion/issues/3) (ehem. AP 1.4 [#4](https://github.com/ktauchert/dev-companion/issues/4) hier mit drin) |
| Branch | `ap-1-3-datenbank` |
| Fertig wenn | Migration läuft gegen Compose-Postgres **und** Nutzer kann Konto anlegen und bleibt eingeloggt |
| Voraussetzung | AP 1.2: `docker compose up` → Postgres **healthy**; AP 1.2b: Fastify ([#38](https://github.com/ktauchert/dev-companion/issues/38), ADR-004) |

**Entscheidung (2026-09):** DB-Schema und Better Auth in einem Schritt — wie bei Framework-Scaffolds (z. B. Laravel): alle Auth-Tabellen mit anlegen, Auth-Wiring optional erst nutzen, aber kein Nachziehen in einem separaten AP.

Kein zweiter Datenbankserver. Eine Postgres-DB, ein Drizzle-Client, ein Auth-Stack.

## Ziel

`packages/database`: Schema, Migrationen, `getDatabaseUrl()` / `createDb()`.  
`packages/auth`: Grenze + Better Auth + `drizzleAdapter(db)` (ADR-002).  
Fastify-API: DB-Plugin, Auth-Handler, Session-Cookie. Web: Register/Login — ruft die API auf (ADR-003), kein direkter DB-Zugriff.

Projektbesitz in **1.5** — hier reicht User-Identität und `project.owner_id` als FK-Vorbereitung.

## In diesem AP

* Drizzle ORM + drizzle-kit + Postgres-Treiber in `@dev-companion/database`
* **Alle Tabellen in einer Migration:** Better-Auth-Kern (`user`, `session`, `account`, `verification`) + App (`project`, `document`)
* Schema an [Better Auth Core Schema](https://better-auth.com/docs/concepts/database#core-schema) / [Drizzle-Adapter](https://better-auth.com/docs/adapters/drizzle) — Referenz auch [v1-core-schema.test.ts](https://github.com/better-auth/better-auth/blob/main/packages/core/src/db/test/v1-core-schema.test.ts)
* `migrate` über `getDatabaseUrl()` (keine URL in `.env`)
* `packages/auth`: `betterAuth` + `drizzleAdapter`, Fastify-Mount (`/api/auth/*` o. ä.)
* API: `decorate('db')`, `GET /health` mit DB-Check, CORS + Credentials für Vite
* SPA: Register, Login, Logout, Session über Cookie

## Nicht in diesem AP

Projekt-CRUD (1.5), Dokument-Versionen (1.6), Dashboard (1.7), CI (1.8). OAuth/Social, Magic Link, SMTP als Produktfeature, Cognito, Team/Rollen. Kein Redis, kein RDS.

## Was dafür nötig ist

| Braucht | Stand |
| --- | --- |
| PostgreSQL 16 via Compose | AP 1.2, Root-`docker-compose.yml` |
| Env DB | `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_HOST`, `POSTGRES_PORT` — **kein** `POSTGRES_URL` / `DATABASE_URL` in `.env` |
| Env Auth | `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (API-Basis-URL) — nicht committen |
| URL | `getDatabaseUrl()` in `packages/database` |
| Host-Port | **5432** (`5432:5432`); bei Konflikt Mapping + `POSTGRES_PORT` anpassen (siehe ap2) |
| Packages | `packages/database`, `@dev-companion/auth` (Hülle AP 1.1) |
| API | Fastify AP 1.2b |

Details Env/Compose: [AP 1.2 Nachlese](../../../lessons-learned/phase-1/ap2.md).

## Schema (Arbeitsstand)

Better Auth: IDs als Text. Drizzle: JS camelCase, DB snake_case (wie CLI-Output).

```text
user       — Better Auth Core
session    — Better Auth Core
account    — Better Auth Core (Passwort liegt hier, nicht in user)
verification — Better Auth Core

project
  id, owner_id → user, name, status, created_at, updated_at

document
  id, project_id → project, title, body, created_at, updated_at
```

`status` als Text (`draft` / `active`). `document.body` Markdown. Keine Versionstabelle — 1.6.

Kein Domain-CRUD in `packages/database` — nur Tabellen + Verbindungsfabrik.

## Schnitt

```text
packages/database/
  drizzle.config.ts, src/env.ts, src/schema.ts, src/client.ts, src/index.ts
  drizzle/                    # Migrationen committen

packages/auth/
  betterAuth + drizzleAdapter(db); export für API

apps/api/
  DB-Plugin, Auth-Handler, CORS, GET /health (+ checks.database)

apps/web/
  /register, /login, Session (Better Auth Client)
```

Root-Scripts (Namen frei): `db:generate`, `db:migrate`.

## Schritte

```text
1. docker compose up -d && docker compose ps
2. .env: POSTGRES_* + BETTER_AUTH_* (Secret ≥ 32 Zeichen)
3. packages/database: Dependencies, getDatabaseUrl(), createDb()
4. Schema: user, session, account, verification, project, document
5. drizzle-kit generate + migrate
6. packages/auth: betterAuth, drizzleAdapter, emailAndPassword
7. API: db + auth mount, CORS, health DB-Check
8. Web: Register, Login, Logout
9. Nachweis: migrate wiederholbar; Login + Reload → Session da
```

## Offene Punkte (nicht blockierend)

* Treiber `postgres` vs. `pg`
* Wo `dotenv` lädt
* Cookie SameSite lokal (zwei Ports)
* E-Mail-Verifikation an/aus ohne SMTP
* Optional später: `npx auth@latest generate` zum Abgleich — nicht nötig, wenn Schema der Core-Referenz folgt

## Nachweis

* `migrate` erneut ohne Volume löschen
* `\dt` / Studio: sechs Tabellen (+ Indizes wie in Better-Auth-Referenz)
* `GET /health` → database ok
* Konto anlegen → Reload SPA → eingeloggt; Logout beendet Session; geschützte Route ohne Cookie → 401

## Weiterlesen

[Tech-Stack](../../../architecture/tech-stack.md) · [ADR-001](../../../adr/ADR-001-MODULAR-MONOLITH.md) · [ADR-002](../../../adr/ADR-002-PROVIDER-ARCHITECTURE.md) · [ADR-003](../../../adr/ADR-003-SPA-AND-NEST-API.md) · [ADR-004](../../../adr/ADR-004-FASTIFY-API.md)
