# Lessons learned — Phase 1 / AP 1.3 Datenbank

Notizen zu [#3 AP 1.3](https://github.com/ktauchert/dev-companion/issues/3). Ziel: Drizzle-Schema und Migrationen in `packages/database`; eine Migration läuft gegen die Compose-Postgres aus AP 1.2.

AP 1.3 legt **keinen zweiten Datenbankserver** an. Der Server läuft schon. Hier entstehen **Tabellen** in derselben Datenbank.

## Welche Datenbank

Eine Instanz, eine Datenbank:

| Was | Wert |
| --- | --- |
| Engine | PostgreSQL 16 (Image `postgres:16`) |
| Wo der Server lebt | Docker Compose im Repo-Root (`docker compose up`) |
| Datenbankname | `POSTGRES_DB` (lokal typisch `devcompanion`) |
| ORM | Drizzle |
| Schema-Ort | `packages/database` — nicht in `apps/web` oder `apps/api` |
| Tabellen entstehen durch | Drizzle-Migrationen gegen `POSTGRES_URL` |

Kein Redis. Kein zweites Postgres. Kein RDS / Render in Phase 1. Domains teilen sich **eine** physische DB (modularer Monolith).

Die Postgres-Instanz kommt aus AP 1.2. Compose erstellt beim **ersten** Start automatisch die leere Datenbank `POSTGRES_DB` (Named Volume). AP 1.3 füllt sie mit Tabellen.

## Verbindung (AP 1.2, hier nutzen)

Migration braucht eine offene Verbindung. Vor Drizzle:

```text
docker compose up -d
docker compose ps    # postgres healthy
```

Dann mit **`POSTGRES_URL`** verbinden — dieselbe Familie wie `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`. Kein zweites `DATABASE_URL`.

| Setting | Vereinbarung |
| --- | --- |
| Passwort-Env | `POSTGRES_PASSWORD` (so erwartet es das Image) |
| Host-Port | **5454** — 5432 war auf dem Rechner belegt |
| Mapping | `5454:5432` — Host frei wählen, Container bleibt 5432 |
| App-URL | `POSTGRES_URL=postgresql://devcompanion:devcompanion@localhost:5454/devcompanion` |

Werte müssen zwischen Compose, `.env` und `POSTGRES_URL` identisch sein. Compose-Details: [ap2.md](ap2.md).

## Schema — klein, aber nutzbar für 1.4–1.6

Phasenplan: **User, Session, Project, Document**. Mehr Tabellen nur, wenn sie diese vier brauchen (z. B. keine separate Versionstabelle — das ist AP 1.6).

Spalten bewusst **an Better Auth (Drizzle-Adapter) anlehnen**, damit AP 1.4 das User/Session-Modell nicht wegwirft. `account` und `verification` kommen in **AP 1.4**, sobald Login wirklich läuft.

Vorschlag (UUIDs als Text, wie Better Auth):

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

`status` reicht als Text (`draft` / `active` reicht für später). `document.body` ist Markdown. Versionierung ist **nicht** AP 1.3.

Kein Domain-CRUD in diesem Paket. `packages/database` kennt Tabellen und eine Verbindungsfabrik, keine Projekt- oder Dokument-Use-Cases.

## Wo die Dateien liegen

```text
packages/database/
  package.json              # drizzle-orm, drizzle-kit, postgres-Treiber
  drizzle.config.ts         # dialect postgresql, schema, out, POSTGRES_URL
  src/schema.ts             # die vier Tabellen
  src/client.ts             # createDb(url) / Drizzle-Instanz
  src/index.ts              # öffentliche Exports
  drizzle/                  # generierte Migrationen (committen)

apps/api/
  … dünnes Nest-DatabaseModule, das den Client aus @dev-companion/database nimmt
```

Root-Scripts (Namen frei, Absicht fest): `db:generate`, `db:migrate` über das Workspace-Paket `@dev-companion/database`.

`apps/web` spricht die DB nicht an. Die API ist der einzige Prozess mit `POSTGRES_URL`.

## Nest nur anschließen, nicht die Domains bauen

AP 1.2: „Nest/Drizzle kommen in AP 1.3.“ Gemeint ist: die API **kann** die DB nutzen.

- `apps/api` hängt von `@dev-companion/database` ab
- Env: `POSTGRES_URL` (nicht in Git)
- Optionaler Nachweis: `SELECT 1` (Health oder einmaliges Script)

Nicht in AP 1.3: Better Auth, Projekt-API, Dokument-API, UI, CI.

## Schritte (Umsetzung — erst nach coding-Trigger)

```text
1. Compose prüfen: POSTGRES_PASSWORD, Mapping 5454:5432, POSTGRES_URL auf localhost:5454
2. docker compose up -d && docker compose ps   # healthy
3. .env.example: POSTGRES_USER / PASSWORD / DB / URL, gleiche Werte wie Compose
4. packages/database: drizzle-orm, drizzle-kit, postgres (oder pg)
5. Schema: user, session, project, document
6. drizzle.config.ts + src/client.ts
7. drizzle-kit generate   # SQL unter packages/database/drizzle/
8. drizzle-kit migrate    # gegen Compose-Postgres
9. optional: drizzle-kit studio oder psql \dt
10. Nest: Dependency + DatabaseModule, Beweis per SELECT 1
11. Fertig wenn: Migration läuft wiederholt gegen dieselbe DB, ohne die Volume-Daten zu löschen
```

## Fertig wenn / nicht fertig wenn

**Fertig:** Schema im Package, Migration committed, `migrate` gegen Compose-Postgres erfolgreich, API kann den Client importieren.

**Nicht fertig, und nicht dieses Ticket:** Login (1.4), Projekt anlegen (1.5), Dokument versionieren (1.6).
