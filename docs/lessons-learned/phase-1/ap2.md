# Lessons learned — Phase 1 / AP 1.2 Lokal-Infra

Notizen zu [#2 AP 1.2](https://github.com/ktauchert/dev-companion/issues/2). Ziel: `docker compose up` startet lokale PostgreSQL. Nest/Drizzle kommen in AP 1.3.

## Jede DB / jeden Dienst vorher rechtfertigen

Nicht jede Datenbank oder jeden Extra-Dienst aus einem Template oder einer generierten Doc einfach mitnehmen.

Hier stand Redis früh in `development.md` und im Phasenplan. Das wurde anfangs akzeptiert, ohne dass Stack, ADR oder Architektur Redis brauchten. Erst in AP 1.2 — als Compose konkret wurde — kam die Frage: wofür? Antwort: nirgends. Keine Worker, keine Queue, keine LLM-Jobs in Phase 1. Redis war Copy-Paste.

Vor dem Anlegen von Infra deshalb: **brauchen wir diesen Dienst jetzt, mit einem echten Use-Case?** Cache „irgendwann“, Sessions „vielleicht in Redis“, Jobs „falls LLM“ zählen nicht. Sonst schleppt man Betriebsaufwand und Ports mit, die niemand nutzt.

Postgres bleibt, weil User, Projekte und Dokumente persistent sein müssen. Redis kommt erst, wenn ein konkreter Job das verlangt.

## Warum so und nicht anders

**Compose im Repo-Root.** Fertig-wenn ist `docker compose up` ohne `-f`. `infrastructure/docker/` bleibt für Extra-Dateien später.

**Nur Postgres.** Persistenz für User, Projekte, Docs. Redis war ein Template-Default (Cache, Queues, Worker) — es gibt keine Worker, Phase 1 hat keine LLM-Jobs.

**Named Volume.** Daten überleben Container-Neustarts. Datenordner im Repo würde Git vollmüllen.

**`.env` / `.env.example`.** Passwort nicht ins Git (`.env` ist gitignored). `.env.example` committen. `devcompanion` ist nur ein lokaler Platzhalter für User, Passwort und DB-Name (Produktname), kein Docker-Zwang. Werte müssen zwischen Compose, `.env` und später `DATABASE_URL` übereinstimmen. In Produktion diese Defaults nicht kopieren.

**Image `postgres:16`, nicht `latest`.** Major pinnen, keine Überraschung beim Pull.

**Healthcheck.** AP 1.3 kann warten, bis Postgres Verbindungen annimmt, statt gegen einen noch startenden Container zu rennen.

## Ports vorher prüfen

Bevor Compose `5432:5432` bindet: prüfen, ob **5432 auf dem Host frei** ist.

Warum: Eine lokale Postgres, ein anderes Compose-Projekt oder ein IDE-Plugin kann den Port schon belegen. Dann schlägt `compose up` fehl — oder schlimmer: Tools verbinden sich mit der **falschen** Instanz.

```text
ss -ltn | grep 5432
# oder: lsof -i :5432
```

Nichts auf 5432 → so lassen. Port belegt → anderen Host-Port mappen (`5433:5432`) und `DATABASE_URL` anpassen, oder den fremden Dienst stoppen. Nicht raten, welcher Postgres antwortet.

5432 nur lokal publishen, nicht auf einem öffentlichen Server öffnen.

## Compose

`docker-compose.yml` im Root:

```yaml
services:
  postgres:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-devcompanion}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-devcompanion}
      POSTGRES_DB: ${POSTGRES_DB:-devcompanion}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devcompanion -d devcompanion"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

## Schritte

```text
1. Jeden geplanten Dienst rechtfertigen (siehe oben) — unnötige DBs/Caches streichen
2. Port 5432 prüfen (siehe oben)
3. docker-compose.yml im Root
4. .env.example (POSTGRES_* und DATABASE_URL auf localhost:5432)
5. cp .env.example .env   # nie committen
6. docker compose up -d
7. docker compose ps      # healthy
8. optional: docker compose exec postgres psql -U devcompanion -d devcompanion
```

AP 1.2 ist „Postgres läuft“. Die API anbinden ist AP 1.3.
