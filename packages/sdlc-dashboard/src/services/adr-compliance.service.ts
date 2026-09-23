import type { ADR, AdrComplianceResult } from '@dev-companion/shared';
import type { AdrComplianceChecker, PullRequestDiff } from '../interfaces/adr-compliance.js';

/**
 * Placeholder — will use LLM + rule-based checks against accepted ADRs.
 */
export class AdrComplianceServiceImpl implements AdrComplianceChecker {
  async check(pullRequest: PullRequestDiff, _adrs: ADR[]): Promise<AdrComplianceResult> {
    return {
      pullRequestId: pullRequest.pullRequestId,
      pullRequestUrl: pullRequest.pullRequestUrl,
      compliant: true,
      violations: [],
      checkedAt: new Date(),
    };
  }
}
