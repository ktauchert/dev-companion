# AP 1.6 — Dokumentenkern

| | |
| --- | --- |
| Status | nach 1.5 |
| Issue | [#6](https://github.com/ktauchert/dev-companion/issues/6) |
| Branch | `ap-1-6-dokumentenkern` |
| Fertig wenn | Ein Dokument kann angelegt **und versioniert** werden |
| Voraussetzung | AP 1.5: es gibt ein eigenes Projekt; AP 1.3: Tabelle `document` |

## Ziel

Persistente, versionierbare SDLC-Artefakte. Markdown. Speichern, Lesen, Version. **Ohne** Ideation-Wizard (Phase 2). KI schreibt nicht.

Documents ist die Stelle, an der spätere Phasen Artefakte ablegen. Der Kern muss deshalb echt versionieren, nicht nur ein Textfeld überschreiben.

## In diesem AP

* Dokument an einem Projekt anlegen (Titel, Markdown-Body)
* Lesen des aktuellen Stands
* Neue Version schreiben (History bleibt)
* Nur der Projektbesitzer (Phase 1: ein Owner)

## Nicht in diesem AP

Wizard, KI-Entwürfe, Export-Pipelines, ADR-UI (Phase 3 nutzt denselben Kern später). Kein Team-Kommentar (6.3).

## Was dafür nötig ist

| Braucht | Stand |
| --- | --- |
| `@dev-companion/documents` | leere Hülle aus AP 1.1 |
| Tabelle `document` | AP 1.3: `title`, `body` am Kopf — **keine** Versionstabelle |
| Projekt + Auth | 1.4 / 1.5 |
| Philosophie | Artefakte persistent und versioniert ([project-plan](../../project-plan.md)) |

**Versionierung (Arbeitsstand, kein ADR):** 1.3 hat `body` direkt auf `document`. Für History eine Tabelle **`document_version`** (immutable: document_id, version, body, created_at, optional author_id). `document.body` kann den aktuellen Stand cachen oder nur Metadaten halten — eine Variante beim Umsetzen wählen, Migration in `packages/database`.

Nicht: Git als Speicher. Die App-DB ist System of Record.

## Schnitt

```text
packages/documents/     # anlegen, lesen, neue Version
packages/database/      # Migration document_version (+ ggf. document anpassen)
apps/api/               # Routen unter einem Projekt
apps/web/               # einfacher Editor reicht (Textarea), kein Wizard
```

## Schritte

```text
1. Entscheiden: cache auf document.body vs. nur latest über Versionen
2. Migration
3. Domain: create, get, listByProject, saveNewVersion
4. API, nur Owner
5. SPA: Dokument anlegen, speichern erzeugt Version, ältere Version lesbar
```

## Offene Punkte

* Ob Versionen in der UI als Liste mit Restore gezeigt werden oder erst nur „Lesen von Version n“ — Minimum: History existiert und ist über die API lesbar.
* Diff-Ansicht — nicht nötig in Phase 1.

## Nachweis

* Dokument anlegen, Body ändern, erneut speichern → mindestens zwei Versionen
* Aktueller Stand und eine ältere Version sind lesbar
* Dokument hängt am Projekt des Owners

## Weiterlesen

[Domain Documents](../../../architecture/domain-modules.md) · [Overview](../../../architecture/overview.md) · [1.5](ap-1.5-projekte.md)
