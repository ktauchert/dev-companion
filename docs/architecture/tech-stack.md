# Technical Stack

## Frontend

* Vite
* React
* TanStack Router
* TypeScript
* Tailwind CSS
* shadcn/ui

`apps/web` is a SPA. `apps/api` is NestJS. They are one split: UI talks to the API. See [ADR-003](../adr/ADR-003-SPA-AND-NEST-API.md). Next.js is not used.

## Backend

* NestJS
* TypeScript

See [ADR-003](../adr/ADR-003-SPA-AND-NEST-API.md).

## Database

* PostgreSQL

## ORM

* Drizzle ORM

## Authentication

* Better Auth

The authentication layer is designed behind an application boundary so that alternative providers can be introduced later.

## AI

Initial:

* OpenAI

Planned / supported by architecture:

* Ollama
* Azure OpenAI
* Anthropic
* AWS Bedrock

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

