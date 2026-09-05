# Monorepo Structure

```text
apps/
├── web/
│   └── Next.js application
│
└── api/
    └── NestJS application


packages/
├── shared/
│   └── shared types and utilities
│
├── database/
│   └── Drizzle schema and database access
│
├── auth/
│   └── authentication abstractions
│
├── ai/
│   └── LLM abstractions and providers
│
├── architecture/
│   └── architecture domain
│
├── ideation/
│   └── ideation domain
│
├── planning/
│   └── planning domain
│
├── documents/
│   └── document and versioning domain
│
└── validation/
    └── shared validation schemas


infrastructure/
├── docker/
├── render/
└── scripts/


docs/
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

