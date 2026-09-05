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
Redis
```

Additional services may be introduced when required.

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

