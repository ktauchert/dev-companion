import type { ADR, DeploymentGuide, ProjectSpec } from '@dev-companion/shared';

export interface DeploymentGuideInput {
  projectId: string;
  spec: ProjectSpec;
  adrs: ADR[];
  targetStack?: string[];
}

/**
 * Generates post-coding deployment guides from project artifacts.
 */
export interface DeploymentGuideGenerator {
  generate(input: DeploymentGuideInput): Promise<DeploymentGuide>;
}
