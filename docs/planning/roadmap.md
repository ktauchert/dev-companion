# Roadmap

Produkt-Roadmap von MVP bis SaaS/On-Prem. Die [Produktrichtung](product-direction.md) und [User Journey](user-journey.md) sind die verfeinerte Ziel-Sicht.

**Operative Reihenfolge:** [Phasenplan](phasenplan.md) (Phase 1 Fundament läuft; danach MVP-Meilensteine M1–M4).

---

## MVP-Meilensteine (priorisiert)

| # | Meilenstein | Kern-Deliverable | Produkt-Phase |
| --- | --- | --- | --- |
| **M1** | Ideation & Spec | Projektidee → `spec.md` & `/docs/adr/*.md` in der UI | Phase 1.1 – 1.2 |
| **M2** | GitHub PAT Push | PAT → Repo anlegen & Docs pushen | Phase 1.3 |
| **M3** | Board Seeding | Milestones & Issues mit Akzeptanzkriterien via GitHub API | Phase 2.1 – 2.2 |
| **M4** | Tracking Dashboard | Fortschritt & Milestones via PAT-Polling | Phase 3.1 – 3.2 |

Voraussetzung für M1: [Phase 1 Fundament](phasenplan.md#phase-1--fundament) (Auth, Projekte, Dokumentenkern, Dashboard-Basis).

---

## Phase 0 — Foundation (Datenmodell & Schnittstellen)

Technisches Fundament im Monorepo — ohne bestehenden Code zu brechen.

* Module: `ideation`, `architecture-generator`, `board-sync`, `sdlc-dashboard` (Zielnamen; siehe [HINWEIS](../architecture/HINWEIS.md))
* Core models: `ProjectSpec`, `ADR`, `BoardEntity`
* `GitProviderAdapter` (GitHub/GitLab, PAT im MVP)

Läuft parallel zu Phasenplan Phase 1 und bereitet M1–M4 vor.

---

## Phase 1 — Ideation & Architecture Seeding

* KI-guided interview / Spec-Generator (`spec.md`)
* ADR Engine (Prompt-Chains aus Spec)
* Git-Repo-Initialisierung (PAT → Repo + Commits)

→ **M1**, **M2**

---

## Phase 2 — Board Seeding

* Task Breakdown Engine (Spec → Milestones / Epics / Issues)
* GitHub/GitLab API Sync
* Dry-Run: Vorschau in Dev-Companion vor Push

→ **M3**

---

## Phase 3 — SDLC Dashboard & Orchestration

* Status-Dashboard (Milestones, PRs, Commits)
* PAT-Polling (kein Webhook im MVP; On-Prem-freundlich)
* ADR-Compliance-Check (Basic, LLM)
* Deployment-Guide Generator (`DEPLOYMENT.md`)

Der Nutzer coded frei (Cursor, Copilot, Handarbeit). Dev-Companion trackt und guardet die Architektur-Linie.

→ **M4**; 3.3–3.4 nach M4

---

## Phase 4 — Production (SaaS + On-Prem)

* **SaaS:** GitHub App (Webhooks), Stripe (Pro/Team)
* **On-Prem:** Docker Compose / Helm; Ollama/LM Studio für lokale KI

Nach stabilem M1–M4 für Solo-Nutzer.

---

## Horizontale Phasen (Phasenplan)

Die ältere Sequenzierung (Fundament → Ideation → Architektur → Planung → Begleitung → Team) bleibt im [Phasenplan](phasenplan.md) mit GitHub-Issues #1–#29. Mapping:

| Phasenplan | Produkt-Richtung |
| --- | --- |
| Phase 1 — Fundament | Voraussetzung MVP |
| Phase 2 — Ideation | → Phase 1.1 |
| Phase 3 — Architektur | → Phase 1.2 |
| Phase 4 — Planung | → Phase 2 (Board-Seeding) |
| Phase 5 — Begleitung | → Phase 3.3 – 3.4 |
| Phase 6 — Team | → Phase 4 (Team-Accounts) |

---

## Consistency loop

Acknowledging showing up, complimenting small contributions, never scoring by volume — visible from the first project dashboard (AP 1.7) and deepening through SDLC tracking. Not a late add-on.

## Status

MVP-Meilensteine M1–M4 sind die nächste Produkt-Priorität nach Abschluss von Phase 1 Fundament. Tagesarbeit: [Phasenplan](phasenplan.md) → aktuell **AP 1.3**.
