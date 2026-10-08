# Technical Stack

## Frontend

* Vite
* React
* TanStack Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Hook Form + `@hookform/resolvers` (forms)
* Zod via `@dev-companion/validation` (shared schemas + inferred types)

`apps/web` is a SPA. `apps/api` is Fastify + TypeScript. They are one split: UI talks to the API. See [ADR-003](../adr/ADR-003-SPA-AND-NEST-API.md) and [ADR-004](../adr/ADR-004-FASTIFY-API.md). Next.js is not used.

## Backend

* Fastify
* TypeScript

See [ADR-004](../adr/ADR-004-FASTIFY-API.md). The repo may still contain the AP 1.1 Nest scaffold until AP 1.2b clean Fastify scaffold ([#38](https://github.com/ktauchert/dev-companion/issues/38)).

## Database

* PostgreSQL

## ORM

* Drizzle ORM

## Authentication

* Better Auth (server: `packages/auth`; client: `apps/web/src/lib/auth-client.ts`)

The authentication layer is designed behind an application boundary so that alternative providers can be introduced later.

## Validation

* Zod schemas in `@dev-companion/validation` (`src/schemas/`, inferred types in `src/types/`)
* Used by web forms (RHF) and later by API route validation where needed

## AI

Initial:

* OpenAI (ideation interview, spec, ADR chains, compliance checks)

Planned / supported by architecture:

* Ollama / LM Studio (On-Prem; full decoupling from cloud LLMs)
* Azure OpenAI
* Anthropic
* AWS Bedrock

## Git & project boards

MVP:

* GitHub REST/GraphQL via Personal Access Token (PAT)
* GitLab via same `GitProviderAdapter` boundary
* PAT polling for dashboard updates (no webhooks required)

Later (SaaS):

* GitHub App with webhooks for real-time updates

## Billing (later)

* Stripe for B2B Pro features (team accounts, extended KI quotas)

## Package manager

* npm (workspaces)

The monorepo uses npm workspaces. pnpm was considered for stricter installs; it is not required at this size.

## Infrastructure

* Docker
* Docker Compose
* GitHub Actions

## Hosting

Initial:

* Render

Potential future deployment targets:

* AWS
* Azure
* Self-hosted environments

## Potential AWS Mapping

The architecture should allow future use of:

* Cognito
* RDS
* S3
* SQS
* Bedrock

AWS-specific infrastructure should remain outside the core domain logic.

## Monitoring

Potential future additions:

* OpenTelemetry
* Grafana
* Loki
* CloudWatch

