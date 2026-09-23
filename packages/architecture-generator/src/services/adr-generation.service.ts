import type { LlmProvider } from '@dev-companion/ai';
import type { AdrGenerationInput, AdrGenerationResult, AdrGenerationService } from '../interfaces/adr-generation.js';

/**
 * Placeholder implementation — wires prompt chains once LLM provider adapters exist.
 */
export class AdrGenerationServiceImpl implements AdrGenerationService {
  constructor(private readonly llm: LlmProvider) {}

  async generateFromIdea(_input: AdrGenerationInput): Promise<AdrGenerationResult> {
    throw new Error(
      `AdrGenerationService not yet implemented (provider: ${this.llm.name})`,
    );
  }
}
