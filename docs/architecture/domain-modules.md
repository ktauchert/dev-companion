# Domain Modules

After the strategic refocus (ADR-004), Dev-Companion has three core domain packages plus supporting infrastructure.

## Core domains

### architecture-generator

Responsible for:

* Idea intake and greenfield architecture seeding
* LLM prompt chains for spec and ADR generation
* Building `README.md`, `spec.md`, and `docs/adr/` artifacts
* Pushing seeded documentation into the target repository

Key interfaces: `AdrGenerationService`, `RepoSeedingService`

---

### board-sync

Responsible for:

* Transforming specs and ADRs into board structures
* Creating milestones, epics, and issues on GitHub or GitLab
* Syncing board progress back to Dev-Companion
* Provider abstraction for GitHub and GitLab APIs

Key interfaces: `BoardProviderAdapter`, `BoardSyncService`

---

### sdlc-dashboard

Responsible for:

* Aggregating project progress across repos and boards
* ADR compliance checking on pull requests
* Generating post-coding deployment guides
* Dashboard metrics (milestones, issues, ADR status)

Key interfaces: `SdlcTrackingService`, `AdrComplianceChecker`, `DeploymentGuideGenerator`

---

## Supporting modules

### Auth

* Users, authentication, sessions, authorization
* GitHub/GitLab OAuth token storage for board and repo access

### Projects

* Project metadata, linked repo, linked board, lifecycle

### Documents

* Versioned SDLC artifacts (specs, ADRs, deployment guides)
* Markdown persistence and history

### AI

* `LlmProvider` interface and adapters (OpenAI, Ollama, Anthropic)
* Used by architecture-generator and sdlc-dashboard

### Database

* Drizzle schema, migrations, PostgreSQL access

### Validation

* Structured LLM response parsing (Zod schemas)

---

## Removed modules

The following packages were removed in the v2 refocus:

| Old package | Replaced by | Reason |
| --- | --- | --- |
| `ideation` | `architecture-generator` | Idea intake is now the first step of seeding, not a separate wizard |
| `architecture` | `architecture-generator` | ADR generation is part of greenfield seeding |
| `planning` | `board-sync` | Planning happens on GitHub/GitLab boards, not internally |

Development-phase modules (code review, test suggestions, implementation guidance) are out of scope entirely.

---

## Guideline

Core domain packages communicate through explicit interfaces. Concrete adapters (GitHub, GitLab, OpenAI, Ollama) are wired in `apps/api`, not inside domain packages.
