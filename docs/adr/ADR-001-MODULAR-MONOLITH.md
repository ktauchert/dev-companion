# ADR-001: Modular Monolith

## Status

Accepted

## Context

Dev-Companion is initially developed by a small development effort.

The product requires clear domain boundaries but does not currently require independent service deployment or independent scaling.

## Decision

Dev-Companion will be implemented as a modular monolith.

The application will contain explicit domain modules with defined boundaries while remaining operationally simple.

## Benefits

* Simple deployment
* Simple local development
* Lower infrastructure complexity
* Easier integration testing
* Clear domain boundaries
* Easier refactoring during early development

## Consequences

Modules must maintain clear boundaries.

Future extraction into independent services remains possible where justified by actual requirements.

Microservices will not be introduced solely for architectural appearance.

