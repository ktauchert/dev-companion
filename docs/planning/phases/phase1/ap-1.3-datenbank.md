# AP 1.3 — Datenbank

| | |
| --- | --- |
| Status | als Nächstes |
| Issue | [#3](https://github.com/ktauchert/dev-companion/issues/3) |
| Branch | `ap-1-3-datenbank` (aktuell `3-ap-1-3-datenbank`) |
| Fertig wenn | Eine Drizzle-Migration läuft gegen die Compose-Postgres aus AP 1.2 |
| Voraussetzung | AP 1.2: `docker compose up` → Postgres **healthy** |

Kein zweiter Datenbankserver. Der Server läuft. Hier entstehen **Tabellen** in derselben Datenbank.

## Ziel

`packages/database` ist das Schema- und Zugriffs-Paket. Die Nest-API kann den Client importieren. Web spricht Postgres nicht an.

## In diesem AP

* Drizzle ORM + drizzle-kit + Postgres-Treiber im Workspace-Paket `@dev-companion/database`
* Schema: **user**, **session**, **project**, **document**
* Generierte Migration committen, `migrate` gegen `POSTGRES_URL`
* Dünnes Nest-`DatabaseModule`: Client bereitstellen, Nachweis `SELECT 1`

## Nicht in diesem AP

Login (1.4), Projekt-CRUD (1.5), Dokument-Versionen (1.6), Dashboard (1.7), CI (1.8). Kein Redis, kein RDS, kein zweites Postgres.

`account` / `verification` (Better Auth) kommen in **1.4**.

## Was dafür nötig ist

| Braucht | Stand |
| --- | --- |
| PostgreSQL 16 via Compose | AP 1.2, Root-`docker-compose.yml` |
| Env | `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, **`POSTGRES_URL`** — eine Familie, kein `DATABASE_URL` |
| Host-Port | **5454** (`5454:5432`), weil 5432 lokal belegt war |
| URL | `postgresql://devcompanion:devcompanion@localhost:5454/devcompanion` |
| Package-Hülle | `packages/database/package.json` existiert (AP 1.1) |
| API | Nest in `apps/api`, noch ohne DB |

Compose und `.env.example` müssen zur URL passen. Details: [AP 1.2 Nachlese](../../../lessons-learned/phase-1/ap2.md).

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
  drizzle.config.ts      # postgresql, schema, out, POSTGRES_URL
  src/schema.ts
  src/client.ts          # createDb(url)
  src/index.ts
  drizzle/               # generierte SQL-Migrationen (committen)

apps/api/
  Abhängigkeit @dev-companion/database
  DatabaseModule + POSTGRES_URL laden
```

Root-Scripts (Namen frei): `db:generate`, `db:migrate` über das Workspace-Paket.

## Schritte

```text
1. docker compose up -d && docker compose ps   # healthy
2. .env aus .env.example; POSTGRES_URL zeigt auf localhost:5454
3. Dependencies in packages/database
4. Schema der vier Tabellen
5. drizzle.config.ts + client + exports
6. drizzle-kit generate
7. drizzle-kit migrate                         # Fertig-wenn
8. prüfen: \dt oder Studio — vier Tabellen
9. Nest: Workspace-Dependency, Module, SELECT 1
```

Code erst nach coding-Trigger.

## Offene Punkte (nicht blockierend)

* Treiber: `postgres` (postgres.js) vs. `pg` — beides geht mit Drizzle; eine Wahl beim Umsetzen, kein ADR nötig.
* Wie Nest `POSTGRES_URL` lädt (`dotenv` / `@nestjs/config`) — lokal, solange die URL ankommt.

## Nachweis

* `migrate` erneut ausführbar, ohne das Volume zu löschen
* API startet und kann `SELECT 1`
* Migrationen liegen im Git unter `packages/database/drizzle/`

## Weiterlesen

[Tech-Stack](../../../architecture/tech-stack.md) · [Monorepo](../../../architecture/monorepo.md) · [ADR-001](../../../adr/ADR-001-MODULAR-MONOLITH.md)
