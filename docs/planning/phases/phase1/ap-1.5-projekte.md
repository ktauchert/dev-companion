# AP 1.5 — Projekte

| | |
| --- | --- |
| Status | nach 1.4 |
| Issue | [#5](https://github.com/ktauchert/dev-companion/issues/5) |
| Branch | `ap-1-5-projekte` |
| Fertig wenn | Ein eingeloggter User hat mindestens ein **eigenes** Projekt |
| Voraussetzung | AP 1.4: Session; AP 1.3: Tabelle `project` |

## Ziel

Projekte anlegen, bearbeiten, besitzen, Status setzen. Domain **Projects** (Metadaten, Lifecycle, Ownership). API + einfache UI. Kein Dashboard-Produktgefühl — das ist 1.7.

## In diesem AP

* Anlegen und Bearbeiten (Name, Status)
* `owner_id` = aktueller User; fremde Projekte nicht lesen/ändern
* Einfache SPA-Fläche: Liste der eigenen Projekte, Anlegen, Edit
* Status als Text, klein (`draft` / `active` aus 1.3 reicht, solange nichts anderes entschieden ist)

## Nicht in diesem AP

Dokumente (1.6), Dashboard-Anerkennung (1.7), Teilen/Rollen (Phase 6), Wizard, KI. Kein Team-Projekt.

## Was dafür nötig ist

| Braucht | Stand |
| --- | --- |
| Tabelle `project` | AP 1.3 (`owner_id`, `name`, `status`, Zeitstempel) |
| Auth | AP 1.4, aktueller User in der API |
| UI-Kit | Tailwind; shadcn falls in 1.4 angelegt |
| Domain-Ort | `domain-modules.md` kennt Projects; **`packages/projects` steht nicht in monorepo.md** |

**Package:** In diesem AP entweder `packages/projects` anlegen und [monorepo.md](../../../architecture/monorepo.md) nachziehen (empfohlen, analog zu `documents`), oder die Logik kurz in der API halten und später extrahieren. Nicht beides halb.

## Schnitt

```text
packages/projects/   # Domain: anlegen, umbenennen, Status, Besitz prüfen
  oder apps/api/…    # nur falls ohne eigenes Package
apps/api/            # HTTP: CRUD der eigenen Projekte
apps/web/            # Liste, Anlegen, Bearbeiten
packages/database/   # nur nutzen, Schema nur ändern wenn 1.3 nicht reicht
```

Domain spricht Drizzle nicht direkt, wenn die Grenze schon steht — sonst Repository hinter der Projects-API, Concrete in Infra. Keine neue Abstraktion nur zum Schein (CONTRIBUTING).

## Schritte

```text
1. Package-Ort festlegen (siehe oben) und Workspace anbinden
2. Use-Cases: create / update / listMine / getMine — immer owner_id prüfen
3. API-Routen, Session zwingend
4. SPA: nach Login Projekte sehen und eines anlegen
5. Nachweis: User A sieht Projekt von User B nicht
```

## Offene Punkte

* Status-Werte über `draft` / `active` hinaus — erst wenn die UI es braucht.
* Löschen / Archivieren — nicht vereinbart; weglassen oder nur „nicht in der Liste“, kein hartes Delete ohne Bedarf.

## Nachweis

* Eingeloggter User legt ein Projekt an und sieht es nach Reload
* `owner_id` ist dieser User
* Zweiter User (falls man zwei Konten anlegt) sieht es nicht

## Weiterlesen

[Domain Projects](../../../architecture/domain-modules.md) · [1.3 Schema](ap-1.3-datenbank.md) · [1.4 Auth](ap-1.4-auth.md)
