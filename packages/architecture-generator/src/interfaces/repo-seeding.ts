import type { ADR, ProjectSpec } from '@dev-companion/shared';

export interface RepoSeedArtifact {
  path: string;
  content: string;
}

export interface RepoSeedInput {
  projectId: string;
  repoOwner: string;
  repoName: string;
  spec: ProjectSpec;
  adrs: ADR[];
  readmeMarkdown: string;
}

export interface RepoSeedResult {
  artifacts: RepoSeedArtifact[];
  commitMessage: string;
}

/**
 * Prepares and pushes greenfield documentation (README, spec.md, docs/adr/) into a target repo.
 */
export interface RepoSeedingService {
  buildArtifacts(input: RepoSeedInput): Promise<RepoSeedResult>;
  pushToRepo(input: RepoSeedInput, accessToken: string): Promise<void>;
}
