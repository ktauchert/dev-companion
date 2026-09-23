# ADR-004: Idea-to-Repo & SDLC Orchestrator

## Status

Accepted

## Context

Dev-Companion was initially positioned as a broad SDLC companion including ideation wizards, planning engines, and development-phase assistance (code review, test suggestions, implementation guidance).

Competitive tools (Cursor, Copilot, Cody) already dominate inline code generation and autocompletion. Competing there adds no differentiation.

The product opportunity is earlier in the lifecycle: turning a vague idea into a documented, board-tracked greenfield project — and then monitoring SDLC progress without touching source code.

## Decision

Refocus Dev-Companion as an **Idea-to-Repo & SDLC Orchestrator** with three core capabilities:

1. **Greenfield Architecture Seeding** — generate README, spec.md, and ADRs; push to target repo.
2. **Board Seeding** — transform artifacts into GitHub/GitLab milestones, epics, and issues.
3. **SDLC Tracking & Dashboard** — monitor progress, check ADR compliance on PRs, generate deployment guides.

### Module structure

```text
packages/
├── architecture-generator/   (replaces ideation + architecture)
├── board-sync/               (replaces planning for external boards)
├── sdlc-dashboard/           (new)
├── shared/                   (core models)
└── ai/                       (LLM provider boundary)
```

### Removed from scope

- Inline code completion or autocompletion
- File-level refactoring or code editing
- Task-level implementation guidance during coding
- Code review assistance beyond ADR compliance checks

### Deployment

Support two modes from MVP architecture:

- **Cloud SaaS** — GitHub OAuth/Apps, cloud LLM APIs
- **On-Premise Docker** — privacy-first, Ollama or cloud LLM via env config

## Benefits

- Clear product positioning distinct from code editors
- Smaller, focused module boundaries
- Natural integration point with GitHub/GitLab (where greenfield projects already live)
- On-premise option for privacy-conscious users

## Consequences

- Old domain packages (`ideation`, `architecture`, `planning`) are replaced
- Phase 5 of the original roadmap (development companion) is removed
- Existing GitHub issues/milestones for removed scope should be closed or re-labelled
- `docs/architecture-v2.md` is the canonical architecture reference going forward
