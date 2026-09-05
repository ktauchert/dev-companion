# Dev-Companion

A guideline and companion for indie and solo developers: a clean, documented line to follow from day one, and recognition for **consistency** — not for how much you shipped in a sitting.

The platform turns an idea into persistent, versioned engineering artifacts. AI assists. It does not replace the developer or become the system of record. Small contributions count; showing up in a coherent style is the point.

## Lifecycle

```text
Idea → Ideation → Requirements → Architecture → Planning
  → Development → Testing → Deployment → Retrospective
```

## Documentation

Full project docs live under [`docs/`](docs/README.md).

| | |
| --- | --- |
| Product | [Plan](docs/planning/project-plan.md) · [Roadmap](docs/planning/roadmap.md) |
| Architecture | [Overview](docs/architecture/overview.md) · [Modules](docs/architecture/domain-modules.md) · [Monorepo](docs/architecture/monorepo.md) · [Stack](docs/architecture/tech-stack.md) |
| Decisions | [ADRs](docs/adr/) |
| Working here | [Development](docs/development.md) · [Contributing](CONTRIBUTING.md) · [Agents](AGENTS.md) |

## Core Principles

* External systems are accessed through explicit provider abstractions where useful.
* SDLC artifacts are represented as persistent documents.
* Important artifacts are versioned.
* Business logic should remain independent from infrastructure implementations.

## Working with Cursor

This repo is a **companion-first** workspace. Cursor Agent is used to interpret, discuss and document before any product code is written.

Project code is changed only when explicitly requested with `code`, `execute`, `umsetzen`, or `make it so`. Documentation may always be updated so it stays aligned with discussions and decisions.

## Current Status

Work in Progress.

The project is currently in architecture and foundation. Product implementation starts only after an explicit coding request.
