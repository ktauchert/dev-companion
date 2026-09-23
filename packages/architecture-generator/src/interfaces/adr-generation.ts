import type { ADR, AdrDraft } from '@dev-companion/shared';
import type { ProjectSpecDraft } from '@dev-companion/shared';

export interface AdrGenerationInput {
  projectId: string;
  ideaDescription: string;
  spec: ProjectSpecDraft;
  existingAdrs?: Pick<ADR, 'number' | 'title' | 'decision'>[];
}

export interface AdrGenerationResult {
  adrs: AdrDraft[];
  readmeMarkdown: string;
  specMarkdown: string;
}

/**
 * Orchestrates LLM prompt chains to produce ADRs, README, and spec.md from an idea.
 */
export interface AdrGenerationService {
  generateFromIdea(input: AdrGenerationInput): Promise<AdrGenerationResult>;
}
