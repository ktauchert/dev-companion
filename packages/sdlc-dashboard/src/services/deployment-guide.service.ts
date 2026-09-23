import type { DeploymentGuide } from '@dev-companion/shared';
import type { DeploymentGuideGenerator, DeploymentGuideInput } from '../interfaces/deployment-guide.js';

/**
 * Placeholder — generates deployment guides after coding phase.
 */
export class DeploymentGuideServiceImpl implements DeploymentGuideGenerator {
  async generate(input: DeploymentGuideInput): Promise<DeploymentGuide> {
    throw new Error(
      `DeploymentGuideService.generate not yet implemented (project: ${input.projectId})`,
    );
  }
}
