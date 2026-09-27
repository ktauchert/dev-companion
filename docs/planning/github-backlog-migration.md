# GitHub Backlog Migration

**Status:** erledigt (2026-09-27) — Migration auf `ktauchert/dev-companion` ausgeführt.

**Quelle der Wahrheit:** dieses Dokument + [product-direction.md](product-direction.md) + [phasenplan.md](phasenplan.md).

Ersetzt die alte Abbildung „Phase 2–6 horizontal“ (#9–#29) durch **MVP-Meilensteine M0–M4 + Production**, behält **Phase 1 Fundament** (#1–#8) und ergänzt **#38 Fastify clean scaffold**.

---

## Ziel-Milestones (Ist-Stand)

| GitHub MS | Milestone | Issues |
| --- | --- | --- |
| 1 | **Phase 1 — Fundament** | #1–#2 ✓, **#38**, #3–#8 |
| 7 | **Foundation — Datenmodell & Provider** | #39–#40 |
| 2 | **M1 — Ideation & Spec** | #11, #9–#10, #12, #15–#16 |
| 8 | **M2 — Git Push** | #41 |
| 4 | **M3 — Board Seeding** | #18, #42–#44 |
| 5 | **M4 — SDLC Tracking** | #45–#47, #24 |
| 6 | **Phase 4 — Production** | #26–#28, #48–#51 |
| 3 | ~~Phase 3 — Architektur~~ | **geschlossen** (0 offen) |

---

## Issue-Mapping (#1–#29 + neu)

| Issue | Aktuell | Aktion | Neu / Ziel | Milestone |
| --- | --- | --- | --- | --- |
| #1 | AP 1.1 Monorepo | **Behalten** (closed) | — | Phase 1 |
| #2 | AP 1.2 Lokal-Infra | **Behalten** (closed) | — | Phase 1 |
| #3 | AP 1.3 Datenbank | **Behalten** | Body: Fastify/ADR-004 | Phase 1 |
| #4 | AP 1.4 Auth | **Behalten** | Body: Fastify/ADR-004 | Phase 1 |
| #5 | AP 1.5 Projekte | **Behalten** | — | Phase 1 |
| #6 | AP 1.6 Dokumentenkern | **Behalten** | — | Phase 1 |
| #7 | AP 1.7 Dashboard | **Behalten** | Basis für M4; kein externes Polling | Phase 1 |
| #8 | AP 1.8 Qualität | **Behalten** | — | Phase 1 |
| **#38** | — | **Neu** | AP 1.2b — Fastify API (clean scaffold) | Phase 1 |
| #9 | AP 2.1 Wizard | **Anpassen** | M1.1 — KI-Interview / Wizard | M1 |
| #10 | AP 2.2 Artefakte | **Anpassen** | M1.2 — spec.md Generierung | M1 |
| #11 | AP 2.3 KI-Provider | **Anpassen** | M1.0 — LLMProvider | M1 |
| #12 | AP 2.4 KI-Hilfe | **Anpassen** | M1.3 — KI-Hilfe im Interview | M1 |
| #13 | AP 2.5 Progress Ideation | **Geschlossen** | Superseded by #9 | — |
| #14 | AP 3.1 Stack-Empfehlung | **Geschlossen** | Superseded by #9 | — |
| #15 | AP 3.2 Architektur-Doku | **Anpassen** | M1.4 — Architektur-Doku aus Spec | M1 |
| #16 | AP 3.3 ADRs | **Anpassen** | M1.5 — ADR Engine | M1 |
| #17 | AP 3.4 Progress Architektur | **Geschlossen** | Superseded by #16 | — |
| #18 | AP 4.1 Backlog-Modell | **Anpassen** | M3.1 — Internes Backlog / Dry-Run Modell | M3 |
| #19 | AP 4.2 Priorisierung | **Geschlossen** | Superseded by #43 | — |
| #20 | AP 4.3 Reihenfolge | **Geschlossen** | Superseded by #42 | — |
| #21 | AP 4.4 Progress Planung | **Geschlossen** | Superseded by #18 | — |
| #22 | AP 5.1 Task-Begleitung | **Geschlossen** | Superseded by #45 (out of scope) | — |
| #23 | AP 5.2 Schulden | **Defer** | Label `later`, kein Milestone | — |
| #24 | AP 5.3 Deployment | **Anpassen** | M4.4 — Deployment-Guide Generator | M4 |
| #25 | AP 5.4 Progress Umsetzung | **Geschlossen** | Superseded by #46 | — |
| #26 | AP 6.1 Teilen | **Anpassen** | P4.1 — Projekt teilen | Phase 4 |
| #27 | AP 6.2 Rollen | **Anpassen** | P4.2 — Rollen | Phase 4 |
| #28 | AP 6.3 Kommentare | **Anpassen** | P4.3 — Kommentare an Artefakten | Phase 4 |
| #29 | AP 6.4 Progress Team | **Geschlossen** | Superseded by #26 | — |

### Neu angelegt (Ist-Nummern)

| Issue | Titel | Milestone | Fertig wenn |
| --- | --- | --- | --- |
| #38 | **AP 1.2b — Fastify API (clean scaffold)** | Phase 1 | Nest-Scaffold löschen, Fastify neu; `GET /health`; ADR-004 — kein Portieren |
| #39 | **F0.1 — Core Types** | Foundation | Interfaces in `packages/shared` |
| #40 | **F0.2 — GitProviderAdapter** | Foundation | Interface + Stub; ADR-002 |
| #41 | **M2.1 — GitHub PAT Push** | M2 — Git Push | PAT → Repo anlegen, README/spec/ADRs committen |
| #42 | **M3.2 — Task Breakdown Engine** | M3 — Board Seeding | Spec → Milestones/Epics/Issues (LLM) |
| #43 | **M3.3 — GitHub Board Sync** | M3 — Board Seeding | Milestones + Issues via API |
| #44 | **M3.4 — Board Dry-Run** | M3 — Board Seeding | Vorschau in UI vor Push |
| #45 | **M4.1 — PAT-Polling** | M4 — SDLC Tracking | Manuell + zeitgesteuert; Refresh-Button |
| #46 | **M4.2 — SDLC Dashboard (extern)** | M4 — SDLC Tracking | Milestone-Fortschritt, PRs/Commits aus Git |
| #47 | **M4.3 — ADR-Compliance-Check** | M4 — SDLC Tracking | PR/Commit-Diff gegen ADRs (LLM, basic) |
| #48 | **P4.4 — GitHub App + Webhooks** | Phase 4 — Production | Upgrade von PAT |
| #49 | **P4.5 — Stripe Billing** | Phase 4 — Production | Pro/Team |
| #50 | **P4.6 — On-Prem Docker/Helm** | Phase 4 — Production | Self-hosted |
| #51 | **P4.7 — Ollama / LM Studio** | Phase 4 — Production | Lokale KI |

---

## Labels (angelegt)

| Label | Bedeutung |
| --- | --- |
| `progress` | Konsistenz-Hinweis (ersetzt AP x.5 Issues) — auf M1-Issues #9–#12, #15–#16 |
| `superseded` | Geschlossen, siehe Nachfolger-Issue — #13, #14, #17, #19–#22, #25, #29 |
| `later` | Bewusst zurückgestellt — #23 |
| `docs-only` | Nur Dokumentation (reserviert) |

---

## Reihenfolge der Arbeit (nach Migration)

```text
Phase 1:  #38 Fastify (clean) → #3 DB → #4 Auth → #5 … → #8
Foundation (parallel wenn sinnvoll):  #39 Types → #40 GitProvider
M1:  #11 LLMProvider → #9 Interview → #10 spec → #16 ADR → #15 Arch-Doku
M2:  #41 Git Push
M3:  #18 Dry-Run → #42 Breakdown → #43 Sync → #44 Dry-Run UI
M4:  #45 Polling → #46 Dashboard → #47 Compliance → #24 Deploy-Guide
P4:  nach stabilem M4
```

---

## Docs aktualisiert

* [phasenplan.md](phasenplan.md) — GitHub-Abschnitt, „Als Nächstes“ (#38 → #3)
* [product-direction.md](product-direction.md) — GitHub-Backlog-Fußnote
* Dieses Dokument — Status erledigt, echte Issue-Nummern
