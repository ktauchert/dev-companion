# ADR-002: Provider Architecture

## Status

Accepted

## Context

Dev-Companion interacts with external systems such as LLM providers and authentication systems.

Different deployment environments may require different implementations.

Examples include:

* OpenAI / Ollama / AWS Bedrock
* Better Auth / Cognito
* Local storage / S3

## Decision

External dependencies that provide meaningful substitution value will be accessed through explicit interfaces.

Example:

```text
LLMProvider
├── OpenAIProvider
├── OllamaProvider
└── BedrockProvider
```

The domain and application layers should depend on the interface rather than the concrete provider.

## Benefits

* Reduced coupling
* Easier testing
* Support for different deployment environments
* Reduced vendor lock-in
* Clear infrastructure boundaries

## Consequences

Additional interfaces and adapters introduce some complexity.

Provider abstractions should only be introduced where they provide meaningful architectural value.

