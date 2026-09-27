# Monorepo Structure

```text
README.md
AGENTS.md
CONTRIBUTING.md

apps/
├── web/                    # Vite + React + TanStack Router (SPA)
└── api/                    # Fastify + TypeScript (Nest scaffold until migration)

packages/
├── shared/                 # Core types: ProjectSpec, ADR, BoardEntity
├── database/
├── auth/
├── ai/                     # LLMProvider (OpenAI; later Ollama)
├── ideation/               # KI interview, spec.md generation
├── architecture/           # Today; target name: architecture-generator (ADR engine)
├── board-sync/             # Planned — GitProviderAdapter, GitHub/GitLab
├── sdlc-dashboard/         # Planned — status, polling, compliance (or extend planning + web)
├── planning/
├── documents/
└── validation/
```

`board-sync` and `sdlc-dashboard` are **not yet in the repo**. See [HINWEIS.md](HINWEIS.md) before adding or renaming packages.

```text
packages/ (current)
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

