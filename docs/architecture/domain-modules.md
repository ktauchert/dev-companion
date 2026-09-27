# Domain Modules

## Auth

Responsible for:

* Users
* Authentication
* Sessions
* Authorization

---

## Projects

Responsible for:

* Projects
* Project metadata
* Project lifecycle
* Project ownership

---

## Ideation

Responsible for:

* KI-guided interview / wizard
* `ProjectSpec` (problem, target users, functional & non-functional requirements)
* Problem definition, goals, constraints, tech-stack veto
* Generation of structured `spec.md`

---

## Architecture (target: architecture-generator)

Responsible for:

* ADR engine and prompt chains (derive ADRs from `spec.md`)
* Architecture proposals and technology recommendations
* Architecture documents and diagrams
* ADRs with status (`Proposed` / `Accepted`)

---

## Board Sync (planned)

Responsible for:

* `GitProviderAdapter` (GitHub, GitLab)
* Repo initialization and doc push (PAT in MVP)
* Board seeding: milestones, epics, issues with acceptance criteria and labels
* Dry-run preview before external push
* `BoardEntity` mapping to provider APIs

See [HINWEIS.md](HINWEIS.md).

---

## SDLC Dashboard (planned)

Responsible for:

* Milestone and issue progress (closed vs. open)
* PR and commit overview
* PAT polling (MVP) and webhook ingestion (later)
* ADR compliance checks on changed files
* Deployment guide generation

Extends the project dashboard from Phase 1 Fundament. See [user-journey](../planning/user-journey.md).

---

## Planning

Responsible for:

* Internal backlog model before board push
* Epics, features, user stories, tasks
* Prioritization and sprint suggestions
* Task breakdown input for board-sync

---

## Documents

Responsible for:

* SDLC artifacts
* Markdown documents
* Document versions
* Document history
* Export

---

## AI

Responsible for:

* Prompt definitions
* LLM provider abstraction
* AI request orchestration
* Structured responses
* Response validation

---

## Deployment

Responsible for:

* Hosting recommendations
* Deployment plans
* Deployment checklists
* Readiness checks

---

## Progress (consistency)

Responsible for:

* Noticing that the user contributed, including small contributions
* Acknowledging consistency in work, style, and progress
* Light, encouraging feedback — not volume scores, leaderboards, or shame for missed days

This is a first-class product concern, not a badge sticker on the UI. Mechanics stay undecided until designed on purpose.

---

## Guideline

Modules should communicate through explicit application interfaces rather than reaching directly into another module's internal implementation.

