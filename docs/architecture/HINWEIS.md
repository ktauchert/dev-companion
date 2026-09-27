# HINWEIS — geplante Code-Anpassungen

Dokumentations-Stand aus [product-direction.md](../planning/product-direction.md) und [ADR-004](../adr/ADR-004-FASTIFY-API.md). **Noch nicht umgesetzt**, sofern nicht explizit mit `code` beauftragt. Orientierung für spätere Arbeitspakete; nichts hier automatisch refactoren.

---

## Nest → Fastify (ADR-004)

**Entschieden, nicht portiert.** `apps/api` enthält noch den Nest-AP-1.1-Scaffold. AP 1.2b ([#38](https://github.com/ktauchert/dev-companion/issues/38)): **clean start** — Nest löschen, Fastify neu aufsetzen. Kein Übertragen von Nest-Modulen oder -Code.

Bei Umsetzung (`code`):

1. Nest-Dateien und `-Dependencies` aus `apps/api` entfernen.
2. Fastify neu: `src/server.ts`, Layout routes → services → providers ([ap-1.2b](../planning/phases/phase1/ap-1.2b-fastify-scaffold.md)).
3. Health-Route (`GET /health`) als Minimal-Nachweis.
4. `packages/*` später importierbar halten — Domain-Logik nicht in Route-Handler.
5. Ports: Web **5173**, API **3000** (wie bisher).
6. Root-`package.json` Scripts `dev:api` / `build:api` anpassen.

Express wäre gleichwertig; ADR-004 nennt Fastify.

---

## Packages (Monorepo)

| Heute (`packages/`) | Ziel | Aktion (wann) |
| --- | --- | --- |
| `ideation` | `ideation` | Schärfen: KI-Interview, `ProjectSpec`, `spec.md`-Export |
| `architecture` | `architecture-generator` (oder Alias) | ADR-Engine, Prompt-Chains; optional Umbenennung |
| — | `board-sync` | **Neu:** `GitProviderAdapter`, GitHub/GitLab Issue- & Milestone-Sync |
| `planning` + Dashboard-UI | `sdlc-dashboard` | Status, PAT-Polling, Compliance; ggf. aus `planning` extrahieren |
| `planning` | `planning` (intern) | Backlog-Modell vor Board-Push; nach Phase 2 teilweise an `board-sync` |
| `documents` | `documents` | Bleibt; persistiert Spec/ADR vor Git-Push |
| `ai` | `ai` | Bleibt; `LLMProvider` für alle Prompt-Chains |

Siehe auch [monorepo.md](monorepo.md) (Zielstruktur).

---

## Interfaces (TypeScript)

Anlegen in `packages/shared` oder je Domain-Package:

```text
ProjectSpec      — ideation
ADR              — architecture-generator / documents
BoardEntity      — board-sync
GitProviderAdapter — board-sync (implementiert: GitHubProvider, GitLabProvider)
```

`GitProviderAdapter` Methoden (Entwurf): `createRepo`, `pushFiles`, `createMilestone`, `createIssue`, `listIssues`, `listPullRequests` — PAT-basiert im MVP.

---

## Apps

| Bereich | Datei / Modul (typisch) | Änderung |
| --- | --- | --- |
| Web | Ideation-Wizard-Routes | Interview-UI, Spec-Vorschau, Dry-Run Board |
| Web | Dashboard-Routes | Milestone-Fortschritt, PR/Commit-Übersicht (AP 1.7 erweitern) |
| API | Fastify routes + services pro Domain | `board-sync` service, Polling-Job oder manueller Refresh-Endpoint |
| API | Secrets / Config | PAT speichern (verschlüsselt); später GitHub App Credentials |

---

## Externe Integrationen

| System | MVP | Später |
| --- | --- | --- |
| GitHub | REST/GraphQL + PAT | GitHub App + Webhooks |
| GitLab | `GitProviderAdapter` | gleiche Schnittstelle |
| OpenAI | `OpenAIProvider` | + OllamaProvider (On-Prem) |
| Stripe | — | Billing Phase 4 |

---

## Phasenplan-Issues

Bestehende Issues #9–#29 decken Teile ab. **Neu zu planen** (noch keine Issues):

* Board-Sync / Dry-Run (Produkt Phase 2)
* PAT-Polling & externer Fortschritt (Produkt Phase 3.2)
* ADR-Compliance-Check (Produkt Phase 3.3)
* Deployment-Guide-Generator (Produkt Phase 3.4)

Vor Issue-Anlage: mit [phasenplan.md](../planning/phasenplan.md) und [product-direction.md](../planning/product-direction.md) abgleichen.
