# Architecture

## Architectural Style

Dev-Companion is implemented as a modular monolith.

The system is divided into three core domain packages plus supporting infrastructure, deployable as a small number of applications.

Microservices are not introduced unless there is a concrete architectural reason.

## High-Level Structure

```text
                    Web Application (SDLC Dashboard)
                              │
                              ▼
                         NestJS API
                              │
              ┌───────────────┼───────────────┐
              │               │               │
    architecture-generator  board-sync  sdlc-dashboard
              │               │               │
              └───────────────┼───────────────┘
                              │
                    shared + documents + ai
                              │
              ┌───────────────┼───────────────┐
              │               │               │
           Database        LLM           Board APIs
              │            Provider      (GitHub/GitLab)
          PostgreSQL     OpenAI/Ollama
```

See [architecture-v2.md](../architecture-v2.md) for detailed data flows.

## Application Boundaries

### Web

Responsible for:

* Idea input wizard
* SDLC progress dashboard
* ADR compliance reports
* Deployment guide viewer
* Project and board linking

The web app is a Vite SPA. It does not own domain logic or persistence; it calls the NestJS API. See [ADR-003](../adr/ADR-003-SPA-AND-NEST-API.md).

### API

Responsible for:

* Authentication handling
* Orchestrating the three core domain packages
* Webhook handlers (PR events for ADR compliance)
* Project and board coordination

### Core Domain Packages

| Package | Phase |
| --- | --- |
| `architecture-generator` | Idea → documented repo |
| `board-sync` | Artifacts → structured board |
| `sdlc-dashboard` | Progress tracking and compliance |

### Infrastructure

Responsible for external systems such as:

* Database (PostgreSQL)
* LLM providers (OpenAI, Ollama, Anthropic)
* Board APIs (GitHub, GitLab)
* Authentication providers
* File storage

## Dependency Rule

Domain packages should not directly depend on concrete infrastructure implementations.

Prefer:

```text
Domain
  ↓
Interface
  ↓
Infrastructure Adapter
  ↓
External System
```

Example:

```text
architecture-generator
   ↓
LlmProvider (packages/ai)
   ↓
OpenAiProvider
   ↓
OpenAI API
```

## Deployment Philosophy

Two deployment modes from the start:

* **Cloud SaaS** — managed hosting, GitHub OAuth/Apps, cloud LLM APIs
* **On-Premise Docker** — privacy-first, local Ollama or configurable cloud LLM

Local development should work without cloud-specific dependencies.

## Out of Scope

Dev-Companion does not generate, edit, or refactor application source code. See [ADR-004](../adr/ADR-004-IDEA-TO-REPO-ORCHESTRATOR.md).
