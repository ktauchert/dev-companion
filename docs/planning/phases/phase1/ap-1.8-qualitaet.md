# AP 1.8 — Qualität

| | |
| --- | --- |
| Status | nach 1.7 (oder sobald 1.3–1.7 auf `main` sind; nicht vor 1.3) |
| Issue | [#8](https://github.com/ktauchert/dev-companion/issues/8) |
| Branch | `ap-1-8-qualitaet` |
| Fertig wenn | CI läuft auf **`main`** |
| Voraussetzung | Fundament-Code aus 1.3–1.7, den die Gates überhaupt prüfen können |

## Ziel

Lint, Typecheck, erste Tests, GitHub Actions. Gates aus [development.md](../../../development.md). Kein Deploy, kein Render.

## In diesem AP

* Root- oder Workspace-Scripts, die lokal dasselbe tun wie CI
* Typecheck der relevanten Packages/Apps
* Lint (heute: web ESLint, api oxlint — nicht zwingend vereinheitlichen)
* Tests, die schon existieren, plus **erste** sinnvolle Tests fürs Fundament (z. B. Auth-Session oder `SELECT 1` / Projekt-Besitz)
* GitHub Actions: bei PR und Push auf `main` — install, typecheck, lint, test

## Nicht in diesem AP

Hosting, Preview-Deploys, Coverage-Zwang, E2E-Framework (Playwright o. Ä.), wenn es noch keins gibt. `npm audit --force` nicht als Gate. LLM-CI.

E2E für kritische Flows steht in development.md als Soll; in 1.8 nur anlegen, wenn der Aufwand klein bleibt (z. B. ein API-Supertest Login). Sonst explizit auf später schieben und hier notieren.

## Was dafür nötig ist

| Braucht | Stand |
| --- | --- |
| Apps | web: ESLint/Prettier; api: oxlint, Vitest, e2e-Vitest-Datei vom Scaffold |
| Root | noch keine CI, wenige Root-Scripts (`dev:web`, `dev:api`) |
| Secrets | CI braucht **keine** Produktions-Postgres; Tests ohne Compose oder mit Service-Container — beim Umsetzen eine Variante wählen |
| Repo | `.github/workflows/` existiert noch nicht |

Compose in CI ist optional. Wenn Migration getestet werden soll: Service-Container Postgres oder Skip mit klarem Kommentar. Nicht heimlich gegen eine lokale 5454-Instanz in GitHub laufen.

## Schnitt

```text
package.json (Root)          # check / test / lint Scripts
.github/workflows/ci.yml     # PR + main
apps/api, apps/web, packages # typecheck so anbinden, dass CI sie sieht
```

## Schritte

```text
1. Lokal: ein Command (oder wenige), das typecheck + lint + test ausführt
2. Fehlende tsconfig/exports der Packages aus 1.3–1.7 reparieren, bis typecheck grün ist
3. Mindestens ein Test, der eine 1.3–1.6-Regel trifft (nicht nur Scaffold-Hello)
4. Workflow: npm ci, dann dieselben Scripts
5. PR mergen; auf main muss der Run grün sein — Fertig-wenn
```

## Offene Punkte

* Ein Linter fürs ganze Repo vs. web ESLint + api oxlint lassen.
* Ob Drizzle-Migrate in CI gegen einen Service-Container läuft.
* Node-Version im Workflow pinnen (lokal vs. Nest-engine-Warnungen aus AP 1.1).

## Nachweis

* Actions-Run auf `main` grün
* Derselbe Check lokal reproduzierbar
* PR ohne grünen Check soll nicht stillschweigend Standard werden — Branch Protection ist nice-to-have, kein Muss fürs Fertig-wenn

## Weiterlesen

[development.md — Quality Gates](../../../development.md) · [AP 1.1 Nachlese](../../../lessons-learned/phase-1/ap1.md) (Install/Audit) · [1.3](ap-1.3-datenbank.md)
