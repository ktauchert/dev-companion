# User Journey

End-to-end-Ablauf von der vagen Idee bis zum getrackten SDLC. Entspricht der verfeinerten [Produktrichtung](product-direction.md).

```mermaid
flowchart TD
    %% Styling
    classDef user fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,color:#01579b
    classDef companion fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#4a148c
    classDef git fill:#e8f5e9,stroke:#388e3c,stroke-width:2px,color:#1b5e20
    classDef external fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#e65100

    subgraph PHASE1 [" Phase 1: Ideation & Architektur (Pre-Repo) "]
        A[User: Vage Idee / Vision]:::user --> B[Dev Companion: KI-Guided Interview / Prompts]:::companion
        B --> C[Dev Companion: Anforderungsanalyse & Tech-Stack Veto]:::companion
        C --> D[Artefakte-Generierung:<br/>• README.md<br/>• spec.md<br/>• docs/adr/*.md]:::companion
    end

    subgraph PHASE2 [" Phase 2: Greenfield Repo & Board Seeding "]
        D --> E{Repo-Setup Choice}:::companion
        E -->|Neues Repo erstellen| F[GitHub / GitLab API: Repo Initalisieren]:::git
        E -->|In leeres Repo pushen| F
        F --> G[Dev Companion: Pusht Readme, Spec & ADRs ins Git]:::git
        G --> H[Dev Companion: Erstellt Board-Struktur<br/>• Milestones<br/>• Epics<br/>• Issues mit Akzeptanzkriterien]:::git
    end

    subgraph PHASE3 [" Phase 3: Active Coding (Freie Tool-Wahl) "]
        H --> I[Entwickler / AI-Coder<br/>Cursor, Claude Code, Copilot, Handarbeit]:::external
        I --> J[Arbeitet Issues ab & pusht PRs / Commits]:::external
    end

    subgraph PHASE4 [" Phase 4: SDLC Orchestration & Tracking "]
        J --> K[Dev Companion: Liest Webhooks / Commits]:::companion
        K --> L[High-Level Status Dashboard:<br/>Fortschritt & Milestones]:::companion
        K --> M[ADR-Compliance-Check:<br/>Weicht Code von der Architektur ab?]:::companion
        L --> N[Deployment Assist:<br/>Generiert How-Tos, Dockerfile, CI/CD]:::companion
    end
```

## Lesart

1. **Pre-Repo** — Alles passiert in Dev-Companion; noch kein externes Git nötig (M1).
2. **Greenfield** — Repo wird angelegt oder befüllt; Board wird geseedet (M2, M3).
3. **Active Coding** — Dev-Companion tritt zurück; der Nutzer wählt sein Coding-Tool frei.
4. **Orchestration** — Dev-Companion liest Status (PAT-Polling im MVP, Webhooks in Phase 4), prüft ADR-Compliance, hilft beim Deploy (M4+).

## MVP vs. später

| Schritt | MVP | Später (Phase 4) |
| --- | --- | --- |
| Git-Anbindung | PAT + Polling | GitHub App + Webhooks |
| KI | OpenAI | + Ollama/LM Studio On-Prem |
| Billing | — | Stripe (Team, Pro-Prompts) |
| Board-Vorschau | Dry-Run vor Push | — |
