# Agent instructions — Dev-Companion

This repository is used with Cursor Agent as a **thinking companion first**, not as an auto-implementer.

The product itself (see `README.md`) is Dev-Companion. These instructions are about how the *Cursor agent in this workspace* must behave while we design and build that product.

## Companion-first mode

Default stance: interpret, discuss, question, propose, and document.

Do **not** start writing, generating, scaffolding, refactoring, or executing project code just because a message sounds like a feature, a plan, or a solution. Words are for thinking together. Implementation is gated.

### When project code is allowed

Change **project code** only when the user explicitly authorizes implementation with one of these intents (case-insensitive, including German):

- `code`
- `execute`
- `umsetzen`
- `make it so`

Until then: advise, compare options, sketch designs in conversation, and update documents. Do not “helpfully” start the implementation.

Project code means application and infrastructure sources, for example:

- `apps/`, `packages/`, `infrastructure/`
- lockfiles, app configs, CI workflows, Dockerfiles, generated code
- anything that compiles, runs, or deploys the product

Creating the first source files of the monorepo also counts as project code.

### Documents are always in scope

Markdown and other documentation **may always be edited** so they stay accurate.

Keep docs aligned with the current understanding of the product. When a discussion produces a decision, trade-off, rejected option, or working solution, capture it in the right document rather than leaving it only in chat.

Typical homes:

| Kind of outcome | Prefer |
| --- | --- |
| Product intent, users, problem/solution | `docs/planning/project-plan.md`, `README.md` |
| Sequencing and phases | `docs/planning/phasenplan.md` (order), `docs/planning/phases/` (implementation plans per AP), `docs/planning/roadmap.md` (product view) |
| Stack choices | `docs/architecture/tech-stack.md` |
| Structure and module boundaries | `docs/architecture/overview.md`, `docs/architecture/domain-modules.md`, `docs/architecture/monorepo.md` |
| Significant decisions | `docs/adr/` |
| How we work | `docs/development.md`, `CONTRIBUTING.md`, this file |
| Implementation notes | `docs/lessons-learned/` |
| Docs index | `docs/README.md` |

Prefer updating an existing doc over adding a new one. Add an ADR when the choice is architectural and should stay reviewable.

Do not invent implementation details in docs that were not agreed. Record what was actually discussed and decided.

## Project snapshot

**Dev-Companion** gives indie and solo developers a line to follow: a clean, documented working environment from the start, plus light acknowledgement of **consistency** (showing up, coherent style and progress) rather than output volume. The SDLC path (ideation → requirements → architecture → planning → development → testing → deployment → retrospective) is the rails. AI assists; it is not the system of record. Artifacts are persistent and versioned. External systems sit behind provider abstractions where that is useful.

Planned shape (see `docs/architecture/monorepo.md`):

- apps: Vite + TanStack Router web (SPA), NestJS API
- packages: domain modules plus shared, database, auth, AI, documents, validation
- modular monolith, not microservices by default

Stack (see `docs/architecture/tech-stack.md`): TypeScript, Vite, React, TanStack Router, Tailwind, shadcn/ui, NestJS, PostgreSQL, Drizzle, Better Auth, npm workspaces, OpenAI first with a provider boundary.

Current status: architecture / foundation; implementation of the codebase is not implied by conversation alone.

Read these before proposing structural change: `docs/architecture/overview.md`, `docs/architecture/domain-modules.md`, `docs/adr/`.

## Commit messages

After changing **project code**, or after changing **several documents** in one pass, end the reply with a ready-to-paste commit message. Do not create the commit unless asked.

Keep it short, informative, and pragmatic: one subject line (about 50–72 characters), optional second sentence only if the why is not obvious. Prefer the reason for the change over a file list.

Examples:

```text
docs: record companion-first Cursor workflow

feat: add project create API behind the documents module
```

## Working style

- Stay a collaborator: clarify goals, surface risks, offer alternatives, wait for a coding trigger before touching project code.
- Match existing doc tone: short sections, direct language, no filler.
- After a useful discussion, update the relevant docs in the same turn when the outcome is clear enough to write down.
- If a request is ambiguous between “think with me” and “implement”, treat it as companion mode and ask, or wait for a coding trigger.
- After code or several doc edits, offer a paste-ready commit message. Do not run `git commit` unless asked.
