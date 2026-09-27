# GitHub Backlog Migration

**Status:** geplant — Zielstruktur und Mapping. Ausführung per lokalem Agent mit `gh` (siehe [Agent-Prompt](#agent-prompt-copy-paste) unten).

**Quelle der Wahrheit nach Migration:** dieses Dokument + [product-direction.md](product-direction.md) + [phasenplan.md](phasenplan.md).

Ersetzt die alte Abbildung „Phase 2–6 horizontal“ (#9–#29) durch **MVP-Meilensteine M0–M4 + Production**, behält **Phase 1 Fundament** (#1–#8).

---

## Ziel-Milestones

| # | Milestone (neu) | War (alt) | Issues |
| --- | --- | --- | --- |
| M1 | **Phase 1 — Fundament** | Milestone 1 (unverändert) | #1–#8, neu #30 |
| M2 | **Foundation — Datenmodell & Provider** | neu | #31–#32 |
| M3 | **M1 — Ideation & Spec** | Milestone 2+3 zusammen | #9–#12, #16 (angepasst) |
| M4 | **M2 — Git Push** | neu | #33 |
| M5 | **M3 — Board Seeding** | Milestone 4 | #18 (angepasst), #34–#36 |
| M6 | **M4 — SDLC Tracking** | Milestone 5 | #7 erweitert?, #37–#39 |
| M7 | **Phase 4 — Production** | Milestone 6 | #26–#28, #40–#43 |

Issue-Nummern #30+ sind **Vorschläge** — tatsächliche Nummern nach Erstellung eintragen.

---

## Issue-Mapping (#1–#29)

| Issue | Aktuell | Aktion | Neu / Ziel | Milestone |
| --- | --- | --- | --- | --- |
| #1 | AP 1.1 Monorepo | **Behalten** (closed) | — | Phase 1 |
| #2 | AP 1.2 Lokal-Infra | **Behalten** (closed) | — | Phase 1 |
| #3 | AP 1.3 Datenbank | **Behalten** | Body: Fastify statt Nest (ADR-004) | Phase 1 |
| #4 | AP 1.4 Auth | **Behalten** | Body: Fastify | Phase 1 |
| #5 | AP 1.5 Projekte | **Behalten** | — | Phase 1 |
| #6 | AP 1.6 Dokumentenkern | **Behalten** | — | Phase 1 |
| #7 | AP 1.7 Dashboard | **Behalten** | Hinweis: Basis für M4; kein externes Polling | Phase 1 |
| #8 | AP 1.8 Qualität | **Behalten** | — | Phase 1 |
| #9 | AP 2.1 Wizard | **Anpassen** | → **M1.1 — KI-Interview / Wizard** | M1 — Ideation & Spec |
| #10 | AP 2.2 Artefakte | **Anpassen** | → **M1.2 — spec.md Generierung** | M1 |
| #11 | AP 2.3 KI-Provider | **Anpassen** | → **M1.0 — LLMProvider** (Voraussetzung, zuerst) | M1 |
| #12 | AP 2.4 KI-Hilfe | **Anpassen** | → **M1.3 — KI-Hilfe im Interview** | M1 |
| #13 | AP 2.5 Progress Ideation | **Schließen** | Ersetzt durch cross-cutting Label `progress` an M1-Issues | — |
| #14 | AP 3.1 Stack-Empfehlung | **Schließen** | In M1.1 Interview integriert (Tech-Stack-Veto) | — |
| #15 | AP 3.2 Architektur-Doku | **Anpassen** | → **M1.4 — Architektur-Doku aus Spec** | M1 |
| #16 | AP 3.3 ADRs | **Anpassen** | → **M1.5 — ADR Engine** | M1 |
| #17 | AP 3.4 Progress Architektur | **Schließen** | Wie #13 | — |
| #18 | AP 4.1 Backlog-Modell | **Anpassen** | → **M3.1 — Internes Backlog / Dry-Run Modell** | M3 — Board Seeding |
| #19 | AP 4.2 Priorisierung | **Schließen** | Ersetzt durch Board-Labels / Milestones extern | — |
| #20 | AP 4.3 Reihenfolge | **Schließen** | Ersetzt durch Task-Breakdown-Engine | — |
| #21 | AP 4.4 Progress Planung | **Schließen** | Wie #13 | — |
| #22 | AP 5.1 Task-Begleitung | **Schließen** | Out of scope: freie Tool-Wahl (Cursor etc.) | — |
| #23 | AP 5.2 Schulden | **Defer** | Label `later`; optional Milestone „Backlog“ ohne Datum | — |
| #24 | AP 5.3 Deployment | **Anpassen** | → **M4.4 — Deployment-Guide Generator** | M4 — SDLC Tracking |
| #25 | AP 5.4 Progress Umsetzung | **Schließen** | Wie #13 | — |
| #26 | AP 6.1 Teilen | **Anpassen** | → **P4.1 — Projekt teilen** | Phase 4 — Production |
| #27 | AP 6.2 Rollen | **Anpassen** | → **P4.2 — Rollen** | Phase 4 |
| #28 | AP 6.3 Kommentare | **Anpassen** | → **P4.3 — Kommentare an Artefakten** | Phase 4 |
| #29 | AP 6.4 Progress Team | **Schließen** | Wie #13 | — |

### Neu anlegen

| ID (Vorschlag) | Titel | Milestone | Fertig wenn |
| --- | --- | --- | --- |
| #30 | **AP 1.2b — Fastify Migration** | Phase 1 | Nest aus `apps/api`, Fastify Health-Route; ADR-004 |
| #31 | **F0.1 — Core Types** (`ProjectSpec`, `ADR`, `BoardEntity`) | Foundation | Interfaces in `packages/shared` |
| #32 | **F0.2 — GitProviderAdapter** (Interface) | Foundation | Interface + Stub; ADR-002 |
| #33 | **M2.1 — GitHub PAT Push** | M2 — Git Push | PAT → Repo anlegen, README/spec/ADRs committen |
| #34 | **M3.2 — Task Breakdown Engine** | M3 — Board Seeding | Spec → Milestones/Epics/Issues (LLM) |
| #35 | **M3.3 — GitHub Board Sync** | M3 — Board Seeding | Milestones + Issues via API |
| #36 | **M3.4 — Board Dry-Run** | M3 — Board Seeding | Vorschau in UI vor Push |
| #37 | **M4.1 — PAT-Polling** | M4 — SDLC Tracking | Manuell + zeitgesteuert; Refresh-Button |
| #38 | **M4.2 — SDLC Dashboard (extern)** | M4 — SDLC Tracking | Milestone-Fortschritt, PRs/Commits aus Git |
| #39 | **M4.3 — ADR-Compliance-Check** | M4 — SDLC Tracking | PR/Commit-Diff gegen ADRs (LLM, basic) |
| #40 | **P4.4 — GitHub App + Webhooks** | Phase 4 — Production | Upgrade von PAT |
| #41 | **P4.5 — Stripe Billing** | Phase 4 — Production | Pro/Team |
| #42 | **P4.6 — On-Prem Docker/Helm** | Phase 4 — Production | Self-hosted |
| #43 | **P4.7 — Ollama / LM Studio** | Phase 4 — Production | Lokale KI |

### Obsolete Milestones (nach Umbuchung)

| Alt | Aktion |
| --- | --- |
| Milestone 2 „Phase 2 — Ideation“ | **Umbenennen** → „M1 — Ideation & Spec“ oder **schließen** wenn leer |
| Milestone 3 „Phase 3 — Architektur“ | **Schließen** (Issues nach M1) |
| Milestone 4 „Phase 4 — Planung“ | **Umbenennen** → „M3 — Board Seeding“ |
| Milestone 5 „Phase 5 — Begleitung“ | **Umbenennen** → „M4 — SDLC Tracking“ |
| Milestone 6 „Phase 6 — Team“ | **Umbenennen** → „Phase 4 — Production“ |

**Neu anlegen:** Milestones „Foundation — Datenmodell“, „M2 — Git Push“ (falls nicht durch Umbenennung abgedeckt).

---

## Labels (empfohlen)

| Label | Farbe | Bedeutung |
| --- | --- | --- |
| `progress` | gelb | Konsistenz-Hinweis (ersetzt AP x.5 Issues) |
| `superseded` | grau | Geschlossen, siehe Nachfolger-Issue |
| `later` | grau | Bewusst zurückgestellt (#23) |
| `docs-only` | blau | Nur Dokumentation |

---

## Reihenfolge der Arbeit (nach Migration)

```text
Phase 1:  #30 Fastify → #3 DB → #4 Auth → #5 … → #8
Foundation (parallel wenn sinnvoll):  #31 Types → #32 GitProvider
M1:  #11 LLMProvider → #9 Interview → #10 spec → #16 ADR → #15 Arch-Doku
M2:  #33 Git Push
M3:  #18 Dry-Run → #34 Breakdown → #35 Sync → #36 Dry-Run UI
M4:  #37 Polling → #38 Dashboard → #39 Compliance → #24 Deploy-Guide
P4:  nach stabilem M4
```

---

## Docs nach Migration aktualisieren

Der Agent soll nach `gh`-Änderungen diese Dateien anpassen:

* [phasenplan.md](phasenplan.md) — Abschnitt „GitHub“, Issue-Tabelle, „So folgen“
* [product-direction.md](product-direction.md) — Fußnote #1–#29 entfernen/aktualisieren
* [roadmap.md](roadmap.md) — Status-Zeile
* Dieses Dokument — Status auf **erledigt**, echte Issue-Nummern eintragen

**Kein Projektcode** (`apps/`, `packages/`) ohne explizites `code`.

---

## Agent-Prompt (Copy-Paste)

Den folgenden Block **komplett** in den lokalen Cursor-Agenten einfügen. Voraussetzung: `gh auth login` mit Repo-Rechten auf `ktauchert/dev-companion`.

```markdown
## Auftrag: GitHub Backlog an Produktrichtung anpassen

Repo: ktauchert/dev-companion
Branch für Doc-Updates: main (oder eigener Branch `cursor/github-backlog-sync`)

### Regeln
- Nutze `gh` und `gh api` für alle GitHub-Änderungen.
- Lies ZUERST: `docs/planning/github-backlog-migration.md`, `docs/planning/product-direction.md`, `docs/adr/ADR-004-FASTIFY-API.md`
- KEIN Projektcode (`apps/`, `packages/`) ändern — nur GitHub + Docs.
- Geschlossene Issues (#1, #2) nicht wieder öffnen.
- Beim Schließen obsoleter Issues: Kommentar mit `Superseded by #NN` und Label `superseded`.
- Nach jeder Änderung kurz loggen was gemacht wurde.

### Phase A — Audit
1. `gh api repos/ktauchert/dev-companion/milestones`
2. `gh issue list --repo ktauchert/dev-companion --state all --limit 50`
3. Abgleich mit Mapping-Tabelle in `github-backlog-migration.md`
4. Cursor-Todo-Liste prüfen: alles was alte AP 2.5/3.4/4.4/5.4/6.4 oder Nest betrifft → entfernen/ersetzen

### Phase B — Labels
Erstelle falls fehlend: `progress`, `superseded`, `later`, `docs-only`

### Phase C — Milestones
1. Milestone 1 „Phase 1 — Fundament“ — Titel behalten
2. Milestone 2 umbenennen → `M1 — Ideation & Spec` (gh api PATCH milestones/2)
3. Milestone 3 schließen nach Umbuchung aller offenen Issues
4. Milestone 4 umbenennen → `M3 — Board Seeding`
5. Milestone 5 umbenennen → `M4 — SDLC Tracking`
6. Milestone 6 umbenennen → `Phase 4 — Production`
7. Neu anlegen: `Foundation — Datenmodell & Provider`, `M2 — Git Push`

### Phase D — Issues anpassen
**Behalten (Phase 1):** #3–#8 — Body um Fastify/ADR-004 ergänzen wo nötig

**Neu #30:** Issue „AP 1.2b — Fastify Migration“ → Milestone Phase 1, vor #3 einplanen

**M1 umbuchen/anpassen:**
- #11 → Titel „M1.0 — LLMProvider“, Milestone M1
- #9 → „M1.1 — KI-Interview / Wizard“
- #10 → „M1.2 — spec.md Generierung“
- #12 → „M1.3 — KI-Hilfe im Interview“
- #15 → „M1.4 — Architektur-Doku aus Spec“
- #16 → „M1.5 — ADR Engine“

**Schließen mit Kommentar:** #13, #14, #17, #19, #20, #21, #22, #25, #29

**M3:** #18 → „M3.1 — Internes Backlog / Dry-Run Modell“

**M4:** #24 → „M4.4 — Deployment-Guide Generator“

**Phase 4:** #26–#28 Titel anpassen (P4.1–P4.3)

**#23:** offen lassen, Label `later`, Milestone entfernen

### Phase E — Neue Issues
Laut Tabelle „Neu anlegen“ in github-backlog-migration.md (#31–#43) — jeweils mit:
- Milestone
- Kurzbeschreibung + „Fertig wenn“
- Verweis auf product-direction.md

### Phase F — Docs
1. `docs/planning/phasenplan.md` — GitHub-Abschnitt komplett ersetzen mit neuer Tabelle
2. `docs/planning/product-direction.md` — obsolete Fußnote zu #1–#29 aktualisieren
3. `docs/planning/github-backlog-migration.md` — Status erledigt, echte Issue-# eintragen
4. Commit: `docs: sync GitHub backlog with MVP milestones`

### Phase G — Verifikation
- Kein offenes Issue ohne Milestone (außer #23 later)
- Milestone 3 geschlossen oder leer
- phasenplan „Als Nächstes“: #30 oder #3 je nach Stand
- Zusammenfassung für den User: geschlossen / angepasst / neu / Milestones
```
