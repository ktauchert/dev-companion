# Monorepo Structure

```text
README.md
AGENTS.md
CONTRIBUTING.md

apps/
├── web/                    # Vite + React + TanStack Router (SPA)
└── api/                    # NestJS

packages/
├── shared/
├── database/
├── auth/
├── ai/
├── architecture/
├── ideation/
├── planning/
├── documents/
└── validation/

infrastructure/
├── docker/
├── render/
└── scripts/

docs/
├── README.md
├── development.md
├── adr/
├── architecture/
└── planning/

.github/
└── workflows/
```

## Dependency Direction

```text
apps
  ↓
application/domain packages
  ↓
interfaces
  ↓
infrastructure implementations
```

Shared packages should remain small and should not become a general-purpose dumping ground.

Workspaces are declared in the root `package.json` (`apps/*`, `packages/*`). The lockfile is `package-lock.json`.

`apps/web` is the frontend package itself. Do not nest a generated app inside it.

