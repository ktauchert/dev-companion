# AP 1.4 — Auth

| | |
| --- | --- |
| Status | nach 1.3 |
| Issue | [#4](https://github.com/ktauchert/dev-companion/issues/4) |
| Branch | `ap-1-4-auth` |
| Fertig wenn | Nutzer kann ein Konto anlegen und bleibt eingeloggt |
| Voraussetzung | AP 1.3: user/session-Tabellen + API kann die DB |

## Ziel

Registrierung, Login, Session. Auth hinter einer Anwendunggrenze (ADR-002), Implementierung **Better Auth**. Die Web-SPA ruft die API auf, sie besitzt keine Auth-Regeln (ADR-003).

Projektbesitz hier nur soweit: es gibt eine User-Identität, an der `project.owner_id` hängen kann. Anlegen/Bearbeiten von Projekten ist **1.5**.

## In diesem AP

* `packages/auth`: Grenze + Better-Auth-Adapter (nicht Auth-SDK in der Domain)
* Better Auth an Nest hängen (Session-Cookie über die API)
* Tabellen, die Better Auth zusätzlich braucht — mindestens **account** und **verification** — per neuer Drizzle-Migration in `packages/database`
* Register + Login in der SPA (Tailwind ist da; **shadcn/ui** anlegen, sobald Form-Komponenten gebraucht werden)
* CORS + Credentials: Browser `localhost:5173` → API `localhost:3000`
* Geschützte API-Route als Nachweis (z. B. „wer bin ich“)

## Nicht in diesem AP

OAuth/Social Login, Magic Link, SMTP/E-Mail-Verifikation als Produktfeature, Cognito, Projekt-UI, Dokumente, Dashboard-Shell, CI. Kein Team/Rollen (Phase 6).

## Was dafür nötig ist

| Braucht | Stand |
| --- | --- |
| User/Session-Schema | AP 1.3, an Better-Auth-Drizzle angelehnt |
| `@dev-companion/auth` | leere Package-Hülle aus AP 1.1 |
| Stack | Better Auth, Drizzle-Adapter, Nest |
| SPA | Vite, TanStack Router, noch ohne Login-Routen |
| Env | `POSTGRES_URL`; Better-Auth-Secret (Name beim Umsetzen festlegen, nicht committen) |

Lokal: E-Mail + Passwort reicht. Kein Mail-Provider in Phase 1, solange Better Auth ohne SMTP startet.

## Schnitt

```text
packages/auth/          # Interface + Better-Auth-Wiring
packages/database/      # Migration: account, verification (+ ggf. Adapter-Felder)
apps/api/               # Auth-Routen / Better-Auth-Handler, Cookie, CORS
apps/web/               # /register, /login, Session halten, Logout
```

Web speichert keine Passwörter und redet nicht mit Postgres.

## Schritte

```text
1. Better Auth + Drizzle-Adapter; Schema-Diff gegen 1.3-Tabellen
2. Migration für fehlende Auth-Tabellen
3. Nest: Handler, Cookie, CORS für die Vite-Origin
4. packages/auth exportiert die Grenze, API nutzt den Adapter
5. SPA: Register, Login, Logout, „eingeloggt bleiben“ (Cookie)
6. Nachweis: Konto anlegen, Reload, Session da; unauth auf Schutz → 401
```

## Offene Punkte

* Exakter Mount-Pfad der Auth-Routen (`/api/auth` o. Ä.) — beim Umsetzen, an Better-Auth-Default anlehnen.
* Cookie `SameSite` / `secure` für lokal vs. später Render — lokal muss Login mit zwei Ports funktionieren.
* Ob E-Mail-Verifikation intern an ist und still ignoriert wird, oder aus — kein SMTP in Phase 1.

## Nachweis

* Neues Konto → Login → Reload der SPA → weiterhin eingeloggt
* Logout beendet die Session
* Ohne Cookie keine geschützte API

## Weiterlesen

[ADR-002](../../../adr/ADR-002-PROVIDER-ARCHITECTURE.md) · [ADR-003](../../../adr/ADR-003-SPA-AND-NEST-API.md) · [Domain Auth](../../../architecture/domain-modules.md) · [1.3](ap-1.3-datenbank.md)
