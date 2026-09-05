# SDLC Companion

AI-assisted software engineering platform for guiding software projects from idea to production.

## Vision

SDLC Companion supports solo developers and small teams throughout the Software Development Lifecycle.

The platform transforms an initial idea into structured, persistent and versioned software engineering artifacts.

The goal is not to replace developers with AI.

AI acts as an assistant within a structured software development process.

## Lifecycle

```text
Idea
  ↓
Ideation
  ↓
Requirements
  ↓
Architecture
  ↓
Planning
  ↓
Development
  ↓
Testing
  ↓
Deployment
  ↓
Retrospective
```

## Core Principles

* External systems are accessed through explicit provider abstractions where useful.
* SDLC artifacts are represented as persistent documents.
* Important artifacts are versioned.
* Business logic should remain independent from infrastructure implementations.
* AI assists the development process but does not become the system of record.

## Working with Cursor

This repo is a **companion-first** workspace. Cursor Agent is used to interpret, discuss and document before any product code is written.

Project code is changed only when explicitly requested with `code`, `execute`, `umsetzen`, or `make it so`. Documentation may always be updated so it stays aligned with discussions and decisions.

Agent instructions live in `AGENTS.md`.

## Current Status

Work in Progress.

The project is currently in architecture and foundation. Product implementation starts only after an explicit coding request.

