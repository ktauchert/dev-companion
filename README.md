# Dev-Companion

**Idea-to-Repo & SDLC Orchestrator** for greenfield projects.

Dev-Companion is not a code editor, inline autocomplete, or refactoring tool. It sits *before* and *around* development: turning a vague idea into a documented repository, a structured project board, and ongoing SDLC visibility.

## What it does

| Capability | Description |
| --- | --- |
| **Greenfield Architecture Seeding** | From an idea, generate `README.md`, `spec.md`, and ADRs under `docs/adr/`, then push them into the target repo. |
| **Board Seeding** | Transform specs and ADRs into milestones, epics, and issues (with acceptance criteria and subtasks) on GitHub or GitLab. |
| **SDLC Tracking & Dashboard** | Monitor progress across repos and boards, check ADR compliance on pull requests, and generate deployment guides after coding. |
| **Deployment Flexibility** | Cloud SaaS (GitHub OAuth/Apps) or on-premise Docker with local LLMs (Ollama) or cloud APIs (OpenAI, Anthropic). |

## What it is not

- Not inline code completion (Cursor, Copilot)
- Not file-level refactoring or auto-editing of source code
- Not a replacement for the developer's decisions — AI assists, artifacts are the system of record

## Core flow

```text
Idea
  → Architecture Generator (spec + ADRs + README)
    → Repo push
      → Board Sync (milestones, epics, issues)
        → Development (in your editor)
          → SDLC Dashboard (progress, ADR checks, deployment guide)
```

## Documentation

| | |
| --- | --- |
| Architecture | [Overview v2](docs/architecture-v2.md) · [Modules](docs/architecture/domain-modules.md) · [Monorepo](docs/architecture/monorepo.md) · [Stack](docs/architecture/tech-stack.md) |
| Planning | [MVP Roadmap](TODO.md) · [Project plan](docs/planning/project-plan.md) · [Roadmap](docs/planning/roadmap.md) |
| Decisions | [ADRs](docs/adr/) |
| Working here | [Development](docs/development.md) · [Contributing](CONTRIBUTING.md) · [Agents](AGENTS.md) |

## Monorepo layout

```text
packages/
├── architecture-generator/   # Idea → spec, ADRs, repo seeding
├── board-sync/               # Spec/ADRs → GitHub/GitLab board
├── sdlc-dashboard/           # Progress, ADR compliance, deployment guides
├── shared/                   # Core data models (ProjectSpec, ADR, …)
├── ai/                       # LLM provider abstraction
├── documents/                # Artifact persistence
├── database/                 # Drizzle schema & migrations
├── auth/                     # Authentication
└── validation/               # Response validation

apps/
├── web/                      # SDLC dashboard SPA
└── api/                      # NestJS orchestration API
```

## Deployment modes

| Mode | Auth | LLM | Target users |
| --- | --- | --- | --- |
| **Cloud SaaS** | GitHub OAuth / GitHub App | OpenAI, Anthropic | Solo devs, small teams |
| **On-Premise Docker** | Local / self-hosted | Ollama, OpenAI, Anthropic | Privacy-first, enterprise |

## Working with Cursor

This repo uses a **companion-first** workflow for its own development. Product code changes require an explicit trigger (`code`, `execute`, `umsetzen`, `make it so`). Documentation may always be updated.

## Status

Strategic refocus in progress — core module structure and interfaces are defined; MVP implementation follows [TODO.md](TODO.md).
