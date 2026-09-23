import type { ADR, AdrComplianceResult } from '@dev-companion/shared';

export interface PullRequestDiff {
  pullRequestId: string;
  pullRequestUrl: string;
  changedFiles: string[];
  diffContent: string;
}

/**
 * Checks whether a pull request adheres to accepted ADRs.
 */
export interface AdrComplianceChecker {
  check(pullRequest: PullRequestDiff, adrs: ADR[]): Promise<AdrComplianceResult>;
}
