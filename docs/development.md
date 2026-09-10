# Development

## Requirements

* Node.js
* npm
* Docker
* Git

## Local Infrastructure

The initial development environment uses Docker Compose.

Expected services:

```text
PostgreSQL
```

One Compose Postgres, one database. Redis is not in the initial stack. It appeared as a template default (cache, queues, workers). There are no workers yet, and Phase 1 has no LLM jobs. Add Redis when a concrete need exists.

Additional services may be introduced when required.

Compose how-to and pitfalls for AP 1.2: [lessons-learned/phase-1/ap2.md](lessons-learned/phase-1/ap2.md).

### Database (AP 1.3)

Postgres **creates the empty database** on first container start (`POSTGRES_DB`). Tables are **not** created by Compose. They come from Drizzle migrations in `packages/database`, applied against `POSTGRES_URL`.

```text
docker compose up -d          # server + empty DB (AP 1.2)
# then: drizzle migrate       # tables (AP 1.3)
```

Connection vars stay in the `POSTGRES_*` family (`POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_URL`). No separate `DATABASE_URL`.

Host port is **5454** (`5454:5432`) because 5432 was already in use locally. `POSTGRES_URL` must match Compose user, password, database name, and that host port. The API is the only app that uses the URL. Schema and client live in `@dev-companion/database`; `apps/web` does not talk to Postgres.

AP 1.3 implementation plan: [planning/phases/phase1/ap-1.3-datenbank.md](planning/phases/phase1/ap-1.3-datenbank.md). Compose pitfalls: [lessons-learned/phase-1/ap2.md](lessons-learned/phase-1/ap2.md).

## Development Workflow

```text
1. Define requirement
2. Discuss and document (companion mode)
3. Update architecture if necessary
4. Implement — only after an explicit coding request
5. Add tests
6. Run validation
7. Commit
```

Cursor is used as a thinking companion first. Product code is implemented only when the user says `code`, `execute`, `umsetzen`, or `make it so`. Docs may be updated at any time.

After code changes or several document updates, the agent offers a short commit message to paste. Do not auto-commit.

Architectural decisions and final implementation quality remain the responsibility of the developer.

## Connect a local folder to GitHub

Use this when the GitHub repo already exists and this directory is not linked yet.

```text
1. git init
2. git add .
3. git commit -m "…"
4. git branch -M main
5. git remote add origin git@github.com:<user>/<repo>.git
6. git push -u origin main
```

If `origin` already exists: `git remote set-url origin git@github.com:<user>/<repo>.git`

If GitHub created a README (or other commits) and push is rejected: `git pull origin main --allow-unrelated-histories`, then push.

HTTPS instead of SSH: `https://github.com/<user>/<repo>.git`

Do not run these unless asked. The user pastes the commit message and pushes.

## Quality Gates

Changes should pass:

* Type checking
* Unit tests
* Integration tests where applicable
* End-to-end tests for critical flows
* Linting
* Build

