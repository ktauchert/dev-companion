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
packages/auth/
  auth-schema.ts              # Tabellen (CLI generate); nur pgTable, keine relations
  auth.ts                     # betterAuth + drizzleAdapter relations-v2

packages/database/
  drizzle.config.ts           # schema: ../auth/auth-schema.ts + schema-tables.ts
  src/env.ts                  # dotenv (Root-.env), getDatabaseUrl()
  src/db/schema-tables.ts     # project, document
  src/relations.ts            # ein defineRelations für alle 6 Tabellen
  src/schema.ts               # Barrel-Export aller Tabellen
  src/index.ts                # drizzle(url, { relations }) — kein schema-Key (Drizzle 1.0)
  drizzle/                    # Migrationen committen

apps/api/
  routes/auth.ts              # /api/auth/* → auth.handler (Fetch)
  routes/health.ts            # GET /health + SELECT 1
  server.ts                   # CORS (WEB_ORIGIN), Port 3141

apps/web/
  /                 # öffentliche Dummy-Home (SaaS-Landing, auch ausgeloggt)
  /register, /login # Better Auth Client, credentials: include
  /app              # geschützt: Welcome / Mini-Dashboard (Session nötig)
  lib/auth-client.ts
  — noch offen; shadcn/Theme siehe unten
```

Root-Scripts: `db:generate`, `db:migrate`, `db:studio`.

## Monorepo vs. Getting-Started-Tutorials

Drizzle- und Better-Auth-Docs gehen von **einem** Ordner aus: `schema.ts`, `db.ts`, `drizzle/` nebeneinander. Im Workspace ist das aufgeteilt — deshalb passen Copy-Paste-Schritte oft nicht.

| Tutorial-Annahme | Dev-Companion |
| --- | --- |
| Alles in `src/db/schema.ts` | Auth-Tabellen in `packages/auth/auth-schema.ts`, App-Tabellen in `packages/database/src/db/schema-tables.ts` |
| `drizzle(db, { schema })` | Drizzle **1.0 RC:** nur `drizzle(url, { relations })` — Relations in `packages/database/src/relations.ts` |
| `auth generate` schreibt relations mit | Generator kennt `defineRelations` noch nicht → Relations **manuell** mergen, nicht zwei Blöcke auf `user` |
| Adapter `@better-auth/drizzle-adapter` | **`relations-v2`**-Import, wenn Drizzle 1.0 Relations genutzt werden |
| Zirkuläre Imports egal | **`auth` → `@dev-companion/database`**, database importiert Auth-**Schema** per relativem Pfad (`../../auth/…`), nicht `auth.ts` |
| `.env` neben der App | **Root-`.env`**; `packages/database/src/env.ts` lädt sie für drizzle-kit und Laufzeit |
| `DATABASE_URL` in `.env` | Nur `POSTGRES_*`; URL baut `getDatabaseUrl()` (optional `DATABASE_URL`-Override zur Laufzeit) |

**Abhängigkeitsrichtung:** `apps/api` → `@dev-companion/auth` + `@dev-companion/database` → Auth-Schema (relativ). Kein `@dev-companion/auth` in `packages/database/package.json` (Zirkel vermeiden).

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

## Web (SaaS-Schnitt, Stand Diskussion)

Öffentliche Home + Auth + geschützter Einstieg — kein volles Dashboard (Projektliste → AP 1.7).

| Route | Wer | Inhalt |
| --- | --- | --- |
| `/` | alle | Dummy-Landing: Produktversprechen, Links Login/Register |
| `/login`, `/register` | Gäste | E-Mail/Passwort via Better Auth Client |
| `/app` | eingeloggt | Welcome: Name, Logout; Platzhalter für spätere Projektübersicht |

Auth-Guard: TanStack Router `beforeLoad` — Session fehlt → `/login?redirect=…`.

**UI:** Shell, Theme, Ctrl+K — siehe [ui-shell.md](../../../architecture/ui-shell.md) (portiert aus DevOS / `dev-os_OLD`). Für 1.3: shadcn init + Theme-Tokens + minimale Shell auf `/app`; Landing/Auth ohne volle Chrome.

**Ton (Copy):** ermutigend, nicht wertend — wie AP 1.7; kein „0 Projekte“-Tadel auf Welcome.

## Offene Punkte (nicht blockierend)

* Treiber: **`pg`** (entschieden)
* **`dotenv`:** Root-`.env` in `packages/database/src/env.ts` (beim Import von `@dev-companion/database`)
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
