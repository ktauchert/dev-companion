# Architecture

## Architectural Style

SDLC Companion is implemented as a modular monolith.

The system is divided into explicit domain modules while remaining deployable as a small number of applications.

Microservices are not introduced unless there is a concrete architectural reason.

## High-Level Structure

```text
                    Web Application
                         │
                         ▼
                    NestJS API
                         │
              ┌──────────┼──────────┐
              │          │          │
           Ideation  Architecture Planning
              │          │          │
              └──────────┼──────────┘
                         │
                     Documents
                         │
              ┌──────────┼──────────┐
              │          │          │
           Database      AI        Auth
              │          │          │
          PostgreSQL   Provider   Provider
```

## Application Boundaries

### Web

Responsible for:

* User interface
* User interaction
* Presentation
* Client-side state

### API

Responsible for:

* Authentication handling
* API endpoints
* Application orchestration
* Domain module coordination

### Domain Modules

Responsible for business rules and domain behavior.

### Infrastructure

Responsible for external systems such as:

* Database
* LLM providers
* Authentication providers
* File storage
* Queues
* External APIs

## Dependency Rule

Domain modules should not directly depend on concrete infrastructure implementations.

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
Ideation
   ↓
LLMProvider
   ↓
OpenAIProvider
   ↓
OpenAI API
```

## Deployment Philosophy

The application should initially remain simple to deploy while allowing infrastructure to evolve independently.

Local development should work without cloud-specific dependencies.

