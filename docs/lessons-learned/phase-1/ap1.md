# Lessons learned — Phase 1 / AP 1.1 Monorepo

Notizen aus der Umsetzung von [#1 AP 1.1](https://github.com/ktauchert/dev-companion/issues/1). Kein Produktcode-Ersatz; das ist, was beim Zusammenbauen schiefgehen oder übersehen werden kann.

## Ziel von AP 1.1

`npm install` im Repo-Root. Beide Apps starten leer, aber gültig. Workspace-Form laut `docs/architecture/monorepo.md`: `apps/web`, `apps/api`, `packages/*`.

## Was gemacht wurde

* Workspaces im Root auf `apps/*` und `packages/*` gesetzt.
* Verschachteltes Git von Nest (`apps/api/.git`) entfernt.
* Root-`.gitignore` angelegt (`node_modules`, Build, Env, Tooling).
* Jedes Domain-Package mit eigener `package.json` initialisiert (`@dev-companion/<name>`, `private`, `0.0.0`).
* Root-Scripts `dev:web` und `dev:api` ergänzt.
* Ports getrennt: Vite-Default **5173**, Nest **3000**.
* Installs und Lockfiles in den App-Ordnern gelöscht; einmal `npm i` im Root.

## Was berücksichtigt werden musste

### Workspaces-Glob

`apps/web/*` und `apps/api/*` sind falsch, wenn `web` und `api` **selbst** die Pakete sind. Der Stern sucht *in* dem Ordner nach weiteren Packages. Richtig: `apps/*`, `packages/*`.

`apps/web` ist das Frontend-Paket. Kein zweites Scaffold darin (`apps/web/dev-companion-fe`). Das war der Create-Next-Default und passt nicht zu ADR-003.

### Generatoren bringen eigenes Git mit

`nest new` (und ähnliche CLIs) legen ein `.git` im App-Ordner an, auch wenn man „nein“ meint oder übersieht. Im Monorepo darf nur das Root-Repo existieren. Nested `.git` prüfen und löschen, sonst wird `apps/api` nicht mitversioniert bzw. als Submodul missverstanden.

### Leere `packages/`-Ordner existieren für Git und npm nicht

Git trackt keine leeren Verzeichnisse. npm Workspaces brauchen in jedem gematchten Ordner eine `package.json`. Nur Ordner anlegen reicht nicht. Minimales Paket:

```json
{
  "name": "@dev-companion/shared",
  "version": "0.0.0",
  "private": true
}
```

Domain-Code kommt in späteren APs (1.3+). In 1.1 nur die Hülle, damit die Workspace-Form stimmt.

### Kinder-`node_modules` und Kinder-Locks

Wenn web/api zuerst einzeln mit `npm i` installiert wurden, liegen `node_modules` und `package-lock.json` in den Apps. Workspaces sollen **eine** Root-`package-lock.json` und gehoistete Dependencies. Vor dem Root-Install:

```text
rm -rf apps/web/node_modules apps/api/node_modules
rm -f apps/web/package-lock.json apps/api/package-lock.json
npm i
```

Sonst zwei parallele Bäume, und der Root kennt die Workspaces nicht zuverlässig.

### Scripts und Package-`name`

`npm run … -w web` nutzt das Feld `"name"` in der App-`package.json`, nicht den Ordnernamen. Hier heißen die Pakete `web` und `api`.

### Ports

Vite-Starter war auf `--port 3000`, Nest ebenfalls `PORT ?? 3000`. Parallelstart unmöglich. Vite auf den Default **5173** lassen, API auf **3000**.

### Root-`.gitignore` früh

Ohne Ignore landen `node_modules`, Dist, `.env`, Vite-Cache im Git. App-`.gitignore`s der Generatoren reichen nicht für den Root.

### Frontend-Stack vor dem Scaffold festziehen

Next.js stand in den Docs ohne ADR. Erst ADR-003 (Vite + TanStack Router, nicht Start, nicht Next), dann Scaffold. Sonst muss das erste Ticket die falsche App wieder ausbauen.

TanStack Router ist nur Routing. Vite ist Bundler/Dev-Server. TanStack Start wäre Router + Vite + extra Server — den wollen wir nicht, Nest bleibt das Backend.

### Was in AP 1.1 bewusst nicht gemacht wird

Docker, Drizzle, Auth, Projekte, Dokumente, Dashboard-UX, CI. Das sind 1.2–1.8. Generator-Copy („TanStack Start“ auf der Startseite) und der eigentliche Start-Check bleiben beim Umsetzenden, sobald `npm i` durch ist.

`npm i` im Root lief durch (586 Packages). Warnungen von Nest/`@angular-devkit` (Engine vs. lokale Node-Version) und `npm audit` sind zu erwarten; sie blockieren AP 1.1 nicht. Nicht mit `audit fix --force` „reparieren“, solange die Apps starten.

## Check nach dem Root-Install

```text
npm install          # Root; web, api und @dev-companion/* als Workspaces
npm run dev:web      # SPA auf http://localhost:5173
npm run dev:api      # Nest auf http://localhost:3000
```

Nur die Root-`package-lock.json` committen, keine Locks unter `apps/`.
