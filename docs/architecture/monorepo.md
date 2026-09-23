# Monorepo Structure

```text
README.md
TODO.md
AGENTS.md
CONTRIBUTING.md

apps/
├── web/                         # Vite + React + TanStack Router (SDLC dashboard SPA)
└── api/                         # NestJS orchestration API

packages/
├── shared/                      # Core data models (ProjectSpec, ADR, BoardIssue, …)
├── architecture-generator/      # Idea → spec + ADRs + repo seeding
├── board-sync/                  # Spec/ADRs → GitHub/GitLab board
├── sdlc-dashboard/              # Progress, ADR compliance, deployment guides
├── ai/                          # LLM provider abstraction
├── documents/                   # Versioned artifact persistence
├── database/                    # Drizzle schema & migrations
├── auth/                        # Authentication
└── validation/                  # LLM response validation

infrastructure/
├── docker/
├── render/
└── scripts/

docs/
├── README.md
├── architecture-v2.md           # Canonical architecture (v2 refocus)
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
architecture-generator | board-sync | sdlc-dashboard
  ↓
shared + ai + documents
  ↓
interfaces (LlmProvider, BoardProviderAdapter)
  ↓
infrastructure adapters (OpenAI, Ollama, GitHub, GitLab)
```

Shared packages should remain small and should not become a general-purpose dumping ground.

Workspaces are declared in the root `package.json` (`apps/*`, `packages/*`). The lockfile is `package-lock.json`.

`apps/web` is the frontend package itself. Do not nest a generated app inside it.
