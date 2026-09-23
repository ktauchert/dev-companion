import type { LlmCompletionOptions, LlmCompletionResult, LlmMessage, LlmProvider } from '../llm-provider.js';

/** Placeholder for OpenAI API integration. */
export class OpenAiProvider implements LlmProvider {
  readonly name = 'openai';

  constructor(private readonly apiKey: string) {}

  async complete(_messages: LlmMessage[], _options?: LlmCompletionOptions): Promise<LlmCompletionResult> {
    throw new Error('OpenAiProvider not yet implemented');
  }
}
