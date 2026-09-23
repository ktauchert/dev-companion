# Project Plan

## Motivation

Most greenfield projects start with a vague idea and no structure. The developer improvises: no README, no spec, no ADRs, no board. By the time the code exists, the *why* and *what* are lost in chat history.

Dev-Companion exists to close that gap. It turns an idea into a documented repository and a structured project board — then monitors SDLC progress without touching source code.

## Vision

Dev-Companion is an **Idea-to-Repo & SDLC Orchestrator** for solo developers and small teams.

From a vague idea, it produces:

1. A documented repository (`README`, `spec.md`, ADRs)
2. A structured project board (milestones, epics, issues with acceptance criteria)
3. Ongoing SDLC visibility (progress, ADR compliance, deployment guides)

AI assists along the path. The user stays responsible for decisions. Artifacts stay the system of record.

## Target Users

### Primary

* Solo developers starting greenfield projects
* Indie hackers who want structure before code
* Freelancers onboarding new client projects

### Secondary

* Small startups bootstrapping a new product
* Agencies setting up client repos with documentation and boards

## Problem

Greenfield projects frequently suffer from:

* no documented starting point — idea lives only in the developer's head
* no architecture decisions captured before coding begins
* no structured backlog on GitHub/GitLab — work is ad-hoc
* no visibility into whether development follows the original architecture
* no deployment guide when coding is done

## Solution

Three capabilities, one flow:

| Step | Capability | Output |
| --- | --- | --- |
| 1 | Greenfield Architecture Seeding | `README.md`, `spec.md`, `docs/adr/` in the target repo |
| 2 | Board Seeding | Milestones, epics, issues on GitHub/GitLab |
| 3 | SDLC Tracking | Dashboard, ADR compliance on PRs, deployment guide |

## What Dev-Companion is not

* Not a code editor or inline autocomplete tool
* Not a refactoring or code-generation assistant
* Not a replacement for the developer's judgment

## Product Philosophy

* Structure before code. Document and decide early.
* The user remains responsible for decisions.
* AI suggests and generates drafts. Artifacts are the system of record.
* Meet developers where they work: GitHub and GitLab.
* Privacy matters: offer on-premise deployment with local LLMs.

## Architecture Principle

> External dependencies should be replaceable where meaningful.
>
> Important SDLC artifacts are persistent and versioned.
>
> Domain logic should remain independent from infrastructure.
>
> Dev-Companion orchestrates the SDLC; it does not edit application code.
