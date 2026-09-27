# Product Direction — MVP bis SaaS/On-Prem

Verfeinerte Produktrichtung für Dev-Companion. Dieses Dokument ist die **Ziel-Sicht** für Ideation → Spec/ADR → Git → Board → SDLC-Tracking → Deployment-Flexibilität.

Der [Phasenplan](phasenplan.md) bleibt die **operative Reihenfolge** (Fundament zuerst, dann Fähigkeiten). Phase 1 Fundament (AP 1.1–1.8) läuft unverändert weiter. Ab Phase 2 orientiert sich die Umsetzung an den Meilensteinen unten.

User Journey (grafisch): [user-journey.md](user-journey.md).

---

## Phase 0 — Systemarchitektur & Datenmodell (Foundation)

**Ziel:** Technisches Fundament im Monorepo sichern und saubere Schnittstellen definieren, ohne funktionierenden Code zu zerstören.

### 0.1 Modul-Anpassung im Monorepo

| Package | Rolle |
| --- | --- |
| `packages/ideation` | KI-Interviews & Spec-Erstellung (bestehend, schärfen) |
| `packages/architecture-generator` | ADR-Engine & Prompt-Chains (Zielname; heute `packages/architecture`) |
| `packages/board-sync` | Schnittstelle zu GitHub/GitLab (neu) |
| `packages/sdlc-dashboard` | Status-Tracking, Compliance & Deployment (Zielname; heute Teile von Planning + Dashboard) |

Details und Code-Hinweise: [architecture/HINWEIS.md](../architecture/HINWEIS.md).

### 0.2 Core Data Models (TypeScript Interfaces)

* **ProjectSpec** — Titel, Problemstellung, Zielgruppe, Functional Requirements, Non-Functional Requirements
* **ADR** — Title, Context, Decision, Consequences, Status (`Proposed` / `Accepted`)
* **BoardEntity** — Milestone, Epic, Issue inkl. Labels, Assignees, Acceptance Criteria

### 0.3 Provider-agnostisches Provider-Interface

Abstraktes `GitProviderAdapter` für GitHub und GitLab (PAT-basiert im MVP, GitHub App später). Passt zu [ADR-002](../adr/ADR-002-PROVIDER-ARCHITECTURE.md).

---

## Phase 1 — Ideation & Architecture Seeding Engine

**Ziel:** Nutzer gibt eine vage Idee ein; das System liefert fertige Dokumente (`README.md`, `spec.md`, `/docs/adr/*.md`).

| AP | Inhalt |
| --- | --- |
| 1.1 | **KI-Guided Interview / Spec-Generator** — System-Prompts (funktionale Anforderungen, Zielgruppe, Tech-Stack-Veto); strukturierte `spec.md` |
| 1.2 | **ADR Engine** — LLM-Prompt-Chain leitet Architektur-Entscheidungen aus `spec.md` ab (z. B. ADR-001 Frontend, ADR-002 Datenbank) |
| 1.3 | **Git-Repo-Initialisierung (PAT)** — `GitHubProvider`: leeres Repo via API; Direct Commits der Artefakte |

Entspricht im [Phasenplan](phasenplan.md) grob **Phase 2 Ideation** + **Phase 3 Architektur**, plus erstem Git-Push.

---

## Phase 2 — Board-Seeding (GitHub/GitLab Integration)

**Ziel:** `spec.md` und ADRs automatisch in ein spielbereites Projekt-Board überführen.

| AP | Inhalt |
| --- | --- |
| 2.1 | **Task Breakdown Engine** — LLM zerlegt Spec in Milestones/Epics; Issues mit Titel, Beschreibung, Akzeptanzkriterien, ADR-Verknüpfung, Labels |
| 2.2 | **GitHub REST/GraphQL Sync** — Milestones und Issues anlegen, verknüpfen |
| 2.3 | **Fallback / Dry-Run** — Lokale Vorschau der Tickets in Dev-Companion vor Push; Nutzer kann anpassen oder zustimmen |

Entspricht im Phasenplan grob **Phase 4 Planung**, mit externem Board als System of Record für Tasks.

---

## Phase 3 — SDLC Dashboard & PAT-Polling

**Ziel:** Entwickler / Coder-AI arbeitet am Code; Dev-Companion visualisiert Fortschritt und überwacht Architektur.

| AP | Inhalt |
| --- | --- |
| 3.1 | **Status-Dashboard (Web UI)** — Milestones-Fortschritt, Commits/PRs |
| 3.2 | **PAT-Polling** — Zeitgesteuert oder manuell (Refresh); ohne Webhooks; lokal und On-Prem |
| 3.3 | **ADR-Compliance-Check (Basic)** — Geänderte Dateien in PRs/Commits gegen ADRs prüfen (LLM) |
| 3.4 | **Deployment-Guide Generator** — `DEPLOYMENT.md` aus Repo-Analyse (Docker-Compose, Vercel, Helm, …) |

Entspricht im Phasenplan grob **Phase 5 Begleitung** + erweitertes Dashboard (AP 1.7).

**Wichtig:** In Phase 3 arbeitet der Nutzer **frei** mit Cursor, Claude Code, Copilot oder Handarbeit — Dev-Companion orchestriert und trackt, ersetzt den Editor nicht.

---

## Phase 4 — Production & Deployment Flexibility (SaaS + On-Prem)

**Ziel:** SaaS und datenschutzkonforme On-Premises-Instanz.

### 4.1 Cloud/SaaS

* **GitHub App** — Upgrade von PAT; Webhooks für Echtzeit-Updates im Dashboard
* **Stripe** — B2B-Pro-Features (unbegrenzte KI-Prompts, Team-Accounts)

### 4.2 On-Premise / Hybrid

* **Docker Compose / Helm Chart** — selbst gehostete Instanz
* **Ollama / LM Studio** — lokale Modelle für Ideation, Spec, ADR-Checks (Entkopplung von OpenAI/Anthropic)

---

## MVP-Meilensteine (priorisiert)

| Meilenstein | Fokus | Kern-Deliverable | Produkt-Phase |
| --- | --- | --- | --- |
| **M1: Ideation & Spec** | 1.1 – 1.2 | Input UI für Projektidee → `spec.md` & `/docs/adr/*.md` in der UI | Nach Fundament (Phasenplan Phase 1) |
| **M2: GitHub PAT Push** | 1.3 | PAT → Repo anlegen & Docs pushen | |
| **M3: Board Seeding** | 2.1 – 2.2 | Milestones & Issues mit Akzeptanzkriterien via GitHub API | |
| **M4: Tracking Dashboard** | 3.1 – 3.2 | Web-Dashboard mit Fortschritt via PAT-Polling | |

Phase 4 (SaaS/On-Prem) folgt nach M4, wenn M1–M4 für Solo-Nutzer stabil sind.

---

## Abgrenzung zum Phasenplan

| Phasenplan (horizontal) | Produkt-Richtung (vertikal) |
| --- | --- |
| Phase 1 — Fundament | Voraussetzung für alle MVP-Meilensteine |
| Phase 2 — Ideation | → Produkt Phase 1.1 |
| Phase 3 — Architektur | → Produkt Phase 1.2 |
| Phase 4 — Planung | → Produkt Phase 2 (Board-Seeding) |
| Phase 5 — Begleitung | → Produkt Phase 3.3 – 3.4 |
| Phase 6 — Team | → Produkt Phase 4 (Team-Accounts, Stripe) |

**GitHub-Backlog:** Phase 1 (#1–#8) bleibt. #9–#29 werden per [github-backlog-migration.md](github-backlog-migration.md) auf MVP-Milestones (M1–M4, Production) umgebucht — nicht 1:1 die alte horizontale Phase 2–6.
