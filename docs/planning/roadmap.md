# Roadmap

Revised after strategic refocus (ADR-004). See [TODO.md](../../TODO.md) for the prioritized MVP checklist.

## Phase 1 — Foundation

* Monorepo with three core packages
* Database, auth, project linking
* Document storage for artifacts
* CI pipeline

## Phase 2 — Architecture Generator

* LLM provider adapters (OpenAI, Ollama)
* Idea → spec + ADR prompt chains
* Repo seeding (push README, spec.md, docs/adr/)
* Web: idea input wizard

## Phase 3 — Board Sync

* GitHub board adapter (milestones, issues, labels)
* Spec/ADR → epic/story/task decomposition
* Board seeding from artifacts
* GitLab adapter (stretch)

## Phase 4 — SDLC Dashboard

* Progress aggregation from board state
* ADR compliance checking on pull requests
* Deployment guide generation
* Web: dashboard, compliance reports, deployment viewer

## Phase 5 — Deployment Modes

* Docker Compose for on-premise
* GitHub App / OAuth for SaaS
* Environment-based provider selection

## Removed from roadmap

The following phases from the original roadmap are **out of scope**:

* ~~Development Companion~~ (code review, test suggestions, implementation guidance)
* ~~Team Features~~ (deferred post-MVP)

Consistency acknowledgement (light encouragement, no volume scoring) may return as a dashboard feature in Phase 5 polish.

## Status

Strategic refocus complete at documentation and interface level. MVP implementation follows [TODO.md](../../TODO.md) and the [phase plan](phasenplan.md) (to be updated).
