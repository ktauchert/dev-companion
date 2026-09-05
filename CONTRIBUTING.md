# Contributing

## General

Keep modules focused and avoid unnecessary coupling.

Prefer simple solutions over premature abstraction.

## Architecture

New external dependencies should be isolated behind an appropriate interface when there is meaningful value in replacing or testing the dependency independently.

Do not introduce abstractions only for the sake of abstraction.

## Domain Modules

A module should own its domain logic and should expose only the interfaces required by other modules.

## AI

AI-generated code must be reviewed before integration.

AI output must not be treated as inherently correct.

Important AI-generated data entering the domain should be validated before persistence.

## Documentation

Significant architectural decisions should be documented as ADRs in `docs/adr/`.

Discussions that produce a decision, trade-off, or working solution should be reflected in the relevant project documents in the same pass, not left only in chat. Prefer updating an existing document over adding a new one.

## Companion-first (Cursor)

Cursor Agent in this workspace is a thinking companion first.

Do not implement, scaffold, or refactor **project code** unless the request explicitly authorizes it with one of: `code`, `execute`, `umsetzen`, `make it so`.

Documentation may always be edited to stay current. See `AGENTS.md`.

## Commit messages

Keep commits short, informative, and pragmatic.

One subject line (about 50–72 characters). Add a second sentence only when the why is not obvious. Prefer the reason over a list of files.

After the agent changes project code, or several documents, it should offer a ready-to-paste commit message. Commits are created by the user unless explicitly requested.

