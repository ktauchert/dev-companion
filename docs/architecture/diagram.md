# Architecture Diagram

Übersicht der Struktur und Architektur von Dev-Companion. Ergänzt [overview.md](overview.md), [monorepo.md](monorepo.md) und die [User Journey](../planning/user-journey.md).

**Legende:** durchgezogen = im Repo / entschieden · gestrichelt = geplant (noch nicht umgesetzt)

---

## 1. Gesamtarchitektur (System)

```mermaid
flowchart TB
    classDef app fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#0d47a1
    classDef pkg fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef pkgPlanned fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c,stroke-dasharray:5 5
    classDef infra fill:#e8f5e9,stroke:#388e3c,stroke-width:2px,color:#1b5e20
    classDef ext fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#e65100
    classDef user fill:#eceff1,stroke:#546e7a,stroke-width:2px,color:#263238

    U[("👤 Solo Developer")]:::user

    subgraph APPS["apps/ — lauffähige Anwendungen"]
        WEB["apps/web<br/><b>Vite · React · TanStack Router</b><br/>SPA · shadcn/ui · Tailwind"]:::app
        API["apps/api<br/><b>Fastify · TypeScript</b><br/>routes · services · providers"]:::app
    end

    subgraph PKGS["packages/ — Domain & Shared"]
        direction TB
        SHARED["shared<br/>ProjectSpec · ADR · BoardEntity"]:::pkg
        IDEATION["ideation<br/>KI-Interview · spec.md"]:::pkg
        ARCH["architecture<br/>ADR-Engine"]:::pkg
        DOCS["documents<br/>Artefakte · Versionen"]:::pkg
        PLAN["planning<br/>Backlog · Dry-Run"]:::pkg
        AI["ai<br/>LLMProvider"]:::pkg
        AUTH["auth"]:::pkg
        DB["database<br/>Drizzle"]:::pkg
        VAL["validation"]:::pkg
        BOARDSYNC["board-sync<br/>GitProviderAdapter"]:::pkgPlanned
        SDLC["sdlc-dashboard<br/>Polling · Compliance"]:::pkgPlanned
    end

    subgraph DATA["Daten & Infrastruktur"]
        PG[("PostgreSQL")]:::infra
        DOCKER["Docker Compose<br/>lokal"]:::infra
    end

    subgraph EXT["Externe Systeme"]
        OPENAI["OpenAI<br/>später: Ollama"]:::ext
        GITHUB["GitHub / GitLab<br/>PAT · Board · PRs"]:::ext
        STRIPE["Stripe<br/>später SaaS"]:::ext
    end

    U -->|Browser| WEB
    WEB -->|HTTP / JSON| API
    API --> PKGS
    PKGS --> SHARED
    DB --> PG
    API --> DOCKER
    AI --> OPENAI
    BOARDSYNC --> GITHUB
    SDLC --> GITHUB
    AUTH -.->|später Billing| STRIPE
```

---

## 2. Monorepo-Struktur

```mermaid
flowchart LR
    classDef root fill:#eceff1,stroke:#546e7a,stroke-width:2px
    classDef app fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    classDef pkg fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef pkgP fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,stroke-dasharray:5 5
    classDef other fill:#e8f5e9,stroke:#388e3c,stroke-width:2px

    ROOT["/ dev-companion<br/>npm workspaces"]:::root

    ROOT --> APPS
    ROOT --> PACKAGES
    ROOT --> INFRA
    ROOT --> DOCS

    subgraph APPS["apps/"]
        W[web]:::app
        A[api]:::app
    end

    subgraph PACKAGES["packages/"]
        direction TB
        P1[shared · database · auth · ai]:::pkg
        P2[ideation · architecture · planning]:::pkg
        P3[documents · validation]:::pkg
        P4[board-sync · sdlc-dashboard]:::pkgP
    end

    subgraph INFRA["infrastructure/"]
        I1[docker · render · scripts]:::other
    end

    subgraph DOCS["docs/"]
        D1[adr · architecture · planning]:::other
    end

    W -->|API-Calls| A
    A --> PACKAGES
```

---

## 3. API-Schichten (Fastify)

Ziel-Layout nach [ADR-004](../adr/ADR-004-FASTIFY-API.md). Nest-Scaffold in `apps/api` wird bei AP 1.2b (clean Fastify scaffold) ersetzt — kein Portieren von Nest-Code.

```mermaid
flowchart TB
    classDef layer fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    classDef domain fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef adapter fill:#fff3e0,stroke:#f57c00,stroke-width:2px

    CLIENT["apps/web<br/>TanStack Router"]:::layer

    subgraph API["apps/api/src/"]
        ROUTES["routes/<br/>HTTP · Validierung · Auth-Gate"]:::layer
        SERVICES["services/<br/>Ideation · Documents · Board · SDLC"]:::layer
        PROVIDERS["providers/<br/>Adapter-Implementierungen"]:::adapter
        DBLAYER["db/<br/>Drizzle Client"]:::layer
    end

    subgraph PACKAGES["packages/*"]
        DOM["Domain-Logik & Typen"]:::domain
    end

    subgraph IFACE["Interfaces (ADR-002)"]
        LLM["LLMProvider"]:::adapter
        GIT["GitProviderAdapter"]:::adapter
        AUTHP["AuthProvider"]:::adapter
    end

    subgraph EXT["Extern"]
        OAI[OpenAI]:::adapter
        GH[GitHub/GitLab]:::adapter
        PG[PostgreSQL]:::adapter
    end

    CLIENT --> ROUTES
    ROUTES --> SERVICES
    SERVICES --> DOM
    SERVICES --> PROVIDERS
    SERVICES --> DBLAYER
    PROVIDERS --> IFACE
    LLM --> OAI
    GIT --> GH
    DBLAYER --> PG
```

**Abhängigkeitsregel:** Domain → Interface → Adapter → externes System. Kein `packages/ideation` importiert direkt `@octokit/rest`.

---

## 4. Produktfluss × Architektur (MVP)

Verknüpfung von [User Journey](../planning/user-journey.md) und Modulen.

```mermaid
flowchart LR
    classDef mvp fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    classDef mod fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef ext fill:#e8f5e9,stroke:#388e3c,stroke-width:2px

    M0["Phase 0<br/>Foundation<br/>shared · GitProvider"]:::mvp
    M1["M1<br/>Spec & ADR"]:::mvp
    M2["M2<br/>Git Push"]:::mvp
    M3["M3<br/>Board Seed"]:::mvp
    M4["M4<br/>Tracking"]:::mvp

    M0 --> M1 --> M2 --> M3 --> M4

    M1 -.->|ideation · architecture · ai| MOD1["packages"]:::mod
    M2 -.->|board-sync · documents| MOD2["packages"]:::mod
    M3 -.->|board-sync · planning| MOD3["packages"]:::mod
    M4 -.->|sdlc-dashboard · board-sync| MOD4["packages"]:::mod

    M2 & M3 & M4 -.->|PAT / API| GH["GitHub/GitLab"]:::ext
    M1 & M4 -.->|Prompts| OAI["OpenAI"]:::ext
```

---

## 5. Deployment (einfach)

```mermaid
flowchart TB
    classDef host fill:#eceff1,stroke:#546e7a,stroke-width:2px
    classDef app fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    classDef data fill:#e8f5e9,stroke:#388e3c,stroke-width:2px

    subgraph LOCAL["Lokal (Entwicklung)"]
        DV[dev:web :5173]:::app
        DA[dev:api :3000]:::app
        DC[docker compose<br/>PostgreSQL]:::data
        DA --> DC
    end

    subgraph RENDER["Render (initial)"]
        SW[Static Web]:::app
        SA[API Service]:::app
        RD[(Managed Postgres)]:::data
        SA --> RD
    end

    subgraph ONPREM["On-Prem (später)"]
        DOCK[docker-compose.yml<br/>Web + API + Postgres + Ollama]:::host
    end

    LOCAL -.->|gleiche Architektur| RENDER
    RENDER -.->|Phase 4| ONPREM
```

---

## Weitere Ansichten

| Thema | Dokument |
| --- | --- |
| User Journey (detailliert) | [user-journey.md](../planning/user-journey.md) |
| MVP-Phasen M1–M4 | [product-direction.md](../planning/product-direction.md) |
| Domain-Module | [domain-modules.md](domain-modules.md) |
| Geplante Code-Änderungen | [HINWEIS.md](HINWEIS.md) |
