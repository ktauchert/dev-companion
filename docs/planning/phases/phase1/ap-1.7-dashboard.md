# AP 1.7 — Dashboard

| | |
| --- | --- |
| Status | nach 1.6 |
| Issue | [#7](https://github.com/ktauchert/dev-companion/issues/7) |
| Branch | `ap-1-7-dashboard` |
| Fertig wenn | Nach einer kleinen Änderung sieht der User **Anerkennung**, keine Punktzahl |
| Voraussetzung | Login, mindestens ein Projekt, Dokumente speicherbar (1.4–1.6) |

## Ziel

Projektübersicht, Status, erster Konsistenz-Hinweis. Web-Shell (Tailwind, shadcn). Ton ermutigend, nicht wertend.

Progress in Phase 1 nur: „du warst da / du hast etwas festgehalten“. Keine Punkte, keine Leaderboards, keine Streak-Schuld ([project-plan](../../project-plan.md), [domain-modules Progress](../../../architecture/domain-modules.md)).

Mechanik (was genau zählt, wie oft, welche Copy) ist **noch nicht designed**. Hier nur der erste sichtbare Hinweis, absichtlich leicht.

## In diesem AP

* Eingeloggte Startfläche: eigene Projekte, Status sichtbar
* Nach einer kleinen, echten Aktion (Projekt angelegt oder Dokument gespeichert) eine kurze Anerkennung
* Shell: Navigation, Ton, shadcn soweit die Fläche es braucht
* Generator-Copy (z. B. „TanStack Start“) von der Startseite runter, wenn sie noch da ist

## Nicht in diesem AP

Volumen-Scores, Badges-Systeme, tägliche Streaks, Vergleich zwischen Personen. Kein Wizard, keine KI. Kein CI (1.8). Keine Progress-Domain als großes Modell — Mechanics bleiben offen, bis absichtlich designed.

## Was dafür nötig ist

| Braucht | Stand |
| --- | --- |
| SPA + Router | AP 1.1, Tailwind liegt; shadcn ggf. schon aus 1.4 |
| Projekte + Docs | 1.5 / 1.6 als Daten für die Übersicht |
| Auth | 1.4, Dashboard nur eingeloggt |
| Copy-Richtung | Konsistenz, kleine Beiträge; nicht Output |

Kein eigenes `packages/progress` in monorepo.md. Der Hinweis darf in API+Web leben, solange er nicht zur Score-Engine wird.

## Schnitt

```text
apps/web/     # Shell, Dashboard-Route, Hinweis-UI
apps/api/     # Übersicht der eigenen Projekte; optional „letzte kleine Aktion“
```

Kein Tracking-Produkt, kein Analytics-Stack.

## Schritte

```text
1. Dashboard-Route hinter Auth; Projektliste + Status
2. Eine Anerkennungszeile nach Speichern/Anlegen (gleiche Session reicht)
3. Shell: Nav zu Projekten/Dokumenten, Ton prüfen (kein „0 Punkte“)
4. Leere Zustände: noch kein Projekt → zum Anlegen, nicht tadeln
```

## Offene Punkte

* Exact Copy und ob der Hinweis persistiert oder nur in der Session erscheint — leicht halten, in 1.7 entscheiden und hier nachtragen.
* Ob „kleine Änderung“ Projekt, Dokument oder beides ist — beides zählen lassen ist konsistent mit dem Fertig-wenn.

## Nachweis

* Nach Login: Übersicht eigener Projekte
* Nach einer kleinen Speicherung: Anerkennung sichtbar, **keine** Zahl/Rangliste
* Ausgeloggt: Dashboard nicht nutzbar

## Weiterlesen

[Project plan — Konsistenz](../../project-plan.md) · [1.5](ap-1.5-projekte.md) · [1.6](ap-1.6-dokumentenkern.md)
