# AP 1.3 — Datenbank

| | |
| --- | --- |
| Status | nach 1.2b |
| Issue | [#3](https://github.com/ktauchert/dev-companion/issues/3) |
| Branch | `ap-1-3-datenbank` (aktuell `3-ap-1-3-datenbank`) |
| Fertig wenn | Eine Drizzle-Migration läuft gegen die Compose-Postgres aus AP 1.2 |
| Voraussetzung | AP 1.2: `docker compose up` → Postgres **healthy** |

Kein zweiter Datenbankserver. Der Server läuft. Hier entstehen **Tabellen** in derselben Datenbank.

## Ziel

`packages/database` ist das Schema- und Zugriffs-Paket. Die Fastify-API kann den Client importieren. Web spricht Postgres nicht an.

## In diesem AP

* Drizzle ORM + drizzle-kit + Postgres-Treiber im Workspace-Paket `@dev-companion/database`
* Schema: **user**, **session**, **project**, **document**
* Generierte Migration committen, `migrate` über `getDatabaseUrl()` (keine URL in `.env`)
* Dünner DB-Setup in der API: Client bereitstellen, Nachweis `SELECT 1` (z. B. `GET /health` mit DB-Check)

## Nicht in diesem AP

Login (1.4), Projekt-CRUD (1.5), Dokument-Versionen (1.6), Dashboard (1.7), CI (1.8). Kein Redis, kein RDS, kein zweites Postgres.

`account` / `verification` (Better Auth) kommen in **1.4**.

## Was dafür nötig ist

| Braucht | Stand |
| --- | --- |
| PostgreSQL 16 via Compose | AP 1.2, Root-`docker-compose.yml` |
| Env | `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_HOST`, `POSTGRES_PORT` — **kein** `POSTGRES_URL` / `DATABASE_URL` in `.env` |
| Host-Port | **5432** (`5432:5432`); bei belegtem Host-5432 Mapping + `POSTGRES_PORT` anpassen (siehe ap2) |
| URL | in Code: `getDatabaseUrl()` in `packages/database` (Passwort `encodeURIComponent`; optional `DATABASE_URL` zur Laufzeit) |
| Package-Hülle | `packages/database/package.json` existiert (AP 1.1) |
| API | Fastify in `apps/api`, noch ohne DB — Voraussetzung: AP 1.2b clean scaffold ([#38](https://github.com/ktauchert/dev-companion/issues/38), ADR-004) |

Compose, `.env` und `POSTGRES_*`-Teile müssen zusammenpassen; die URL kommt aus dem Helper. Details: [AP 1.2 Nachlese](../../../lessons-learned/phase-1/ap2.md).

## Schema (Arbeitsstand)

Spalten von user/session an den Better-Auth-Drizzle-Adapter anlehnen, damit 1.4 das Modell nicht wegwirft. IDs als Text (wie Better Auth).

```text
user
  id, name, email (unique), email_verified, image, created_at, updated_at

session
  id, expires_at, token, ip_address, user_agent, user_id → user, created_at, updated_at

project
  id, owner_id → user, name, status, created_at, updated_at

document
  id, project_id → project, title, body, created_at, updated_at
```

`status` als Text (`draft` / `active` reicht). `document.body` ist Markdown. Keine Versionstabelle — das ist 1.6.

Kein Domain-CRUD in diesem Paket. Nur Tabellen + Verbindungsfabrik.

## Schnitt

```text
packages/database/
  package.json           # drizzle-orm, drizzle-kit, Treiber; exports
  drizzle.config.ts      # postgresql, schema, out, getDatabaseUrl()
  src/env.ts             # getDatabaseUrl() aus POSTGRES_*
  src/schema.ts
  src/client.ts          # createDb() → getDatabaseUrl()
  src/index.ts
  drizzle/               # generierte SQL-Migrationen (committen)

apps/api/
  Abhängigkeit @dev-companion/database
  DB-Plugin: createDb() / decorate('db'); dotenv lädt POSTGRES_* vor Start
```

Root-Scripts (Namen frei): `db:generate`, `db:migrate` über das Workspace-Paket.

## Schritte

```text
1. docker compose up -d && docker compose ps   # healthy
2. .env aus .env.example; POSTGRES_HOST=localhost, POSTGRES_PORT=5432 (oder angepasster Host-Port)
3. Dependencies in packages/database
4. Schema der vier Tabellen
5. getDatabaseUrl(), drizzle.config.ts, client, exports
6. drizzle-kit generate
7. drizzle-kit migrate                         # Fertig-wenn
8. prüfen: \dt oder Studio — vier Tabellen
9. API: Workspace-Dependency auf `packages/database`, Route/Service, SELECT 1
```

Code erst nach coding-Trigger.

## Offene Punkte (nicht blockierend)

* Treiber: `postgres` (postgres.js) vs. `pg` — beides geht mit Drizzle; eine Wahl beim Umsetzen, kein ADR nötig.
* Wo `dotenv` lädt (API-Einstieg vs. Paket) — lokal reicht, wenn `POSTGRES_*` vor `createDb()` gesetzt sind.

## Nachweis

* `migrate` erneut ausführbar, ohne das Volume zu löschen
* API startet und kann `SELECT 1`
* Migrationen liegen im Git unter `packages/database/drizzle/`

## Weiterlesen

[Tech-Stack](../../../architecture/tech-stack.md) · [Monorepo](../../../architecture/monorepo.md) · [ADR-001](../../../adr/ADR-001-MODULAR-MONOLITH.md)
