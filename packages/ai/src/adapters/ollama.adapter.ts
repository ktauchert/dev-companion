import type { LlmCompletionOptions, LlmCompletionResult, LlmMessage, LlmProvider } from '../llm-provider.js';

/** Placeholder for local Ollama integration (on-premise deployments). */
export class OllamaProvider implements LlmProvider {
  readonly name = 'ollama';

  constructor(private readonly baseUrl: string = 'http://localhost:11434') {}

  async complete(_messages: LlmMessage[], _options?: LlmCompletionOptions): Promise<LlmCompletionResult> {
    throw new Error(`OllamaProvider not yet implemented (baseUrl: ${this.baseUrl})`);
  }
}
