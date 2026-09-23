# MVP Roadmap

Prioritized work items for the first releasable version of Dev-Companion as an **Idea-to-Repo & SDLC Orchestrator**.

Status key: `[ ]` todo · `[~]` in progress · `[x]` done

---

## P0 — Foundation (blocking)

- [x] Restructure packages: `architecture-generator`, `board-sync`, `sdlc-dashboard`
- [x] Define core data models (`ProjectSpec`, `ADR`, `BoardIssue`, `Milestone`, `DeploymentGuide`)
- [x] Define service interfaces and placeholder implementations
- [x] Update documentation (README, architecture-v2, ADR-004)
- [ ] AP 1.3 — Database: Drizzle schema for projects, specs, ADRs, board links
- [ ] AP 1.4 — Auth: registration, login, session (Better Auth)
- [ ] AP 1.5 — Projects: create, link GitHub/GitLab repo, store OAuth tokens
- [ ] AP 1.6 — Documents: versioned artifact storage (spec, ADRs, deployment guides)
- [ ] AP 1.8 — CI: lint, typecheck, test pipeline on `main`

## P1 — Architecture Generator (MVP core #1)

- [ ] `OpenAiProvider` — real OpenAI API adapter
- [ ] `OllamaProvider` — real Ollama API adapter (on-prem)
- [ ] ADR prompt chain — system prompts for spec + ADR generation
- [ ] `AdrGenerationService` — end-to-end idea → spec + ADRs
- [ ] `RepoSeedingService.pushToRepo` — GitHub Contents API commit
- [ ] Web: idea input form → trigger generation → show results
- [ ] Validation: structured LLM output parsing (Zod schemas in `validation`)

## P2 — Board Sync (MVP core #2)

- [ ] `GitHubBoardAdapter` — create milestones, issues, labels via REST/GraphQL
- [ ] Epic/story decomposition — map spec acceptance criteria → issues
- [ ] `BoardSyncService.seedFromArtifacts` — full seeding flow
- [ ] GitLab adapter (stretch — GitHub first)
- [ ] Web: board seeding trigger + sync status view

## P3 — SDLC Dashboard (MVP core #3)

- [ ] `SdlcTrackingService.refreshFromBoard` — pull milestone/issue counts
- [ ] Web: project progress dashboard (phase, milestones, issues, ADRs)
- [ ] GitHub webhook: PR opened → trigger ADR compliance check
- [ ] `AdrComplianceChecker` — rule-based + LLM-assisted ADR violation detection
- [ ] `DeploymentGuideGenerator` — post-coding deployment guide from artifacts
- [ ] Web: ADR compliance report on PRs, deployment guide viewer

## P4 — Deployment modes

- [ ] Docker Compose profile for on-prem (web + api + postgres + ollama)
- [ ] Environment-based provider selection (`LLM_PROVIDER`, `BOARD_PROVIDER`)
- [ ] GitHub App registration flow (SaaS)
- [ ] GitLab OAuth (stretch)

## P5 — Polish (post-MVP)

- [ ] Anthropic provider adapter
- [ ] Multi-project dashboard
- [ ] Board re-sync (update issues when spec changes)
- [ ] Export deployment guide as PDF
- [ ] Light consistency acknowledgement (no volume scoring)

---

## Explicitly deferred (out of scope)

- Inline code completion
- File refactoring or auto-editing
- Task-level coding guidance
- Code review beyond ADR compliance
- Team collaboration features (Phase 6 of old roadmap)

---

## Suggested implementation order

```text
P0 (foundation) → P1 (seed docs) → P2 (seed board) → P3 (dashboard) → P4 (deploy modes)
```

Each P-level maps to one MVP capability. Do not start P2 before P1 produces real artifacts in a repo.
