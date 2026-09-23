export interface LlmMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LlmCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface LlmCompletionResult {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

/**
 * Provider boundary for LLM backends (OpenAI, Anthropic, Ollama, etc.).
 * @see ADR-002
 */
export interface LlmProvider {
  readonly name: string;
  complete(messages: LlmMessage[], options?: LlmCompletionOptions): Promise<LlmCompletionResult>;
}
