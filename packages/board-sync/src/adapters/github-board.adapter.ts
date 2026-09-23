import type { BoardIssue, Milestone } from '@dev-companion/shared';
import type {
  BoardProviderAdapter,
  CreateIssueInput,
  CreateMilestoneInput,
} from '../interfaces/board-provider.js';

/**
 * Placeholder for GitHub REST/GraphQL integration.
 * @see https://docs.github.com/en/graphql
 */
export class GitHubBoardAdapter implements BoardProviderAdapter {
  readonly provider = 'github' as const;

  constructor(
    readonly repoOwner: string,
    readonly repoName: string,
    private readonly accessToken: string,
  ) {}

  async createMilestone(_input: CreateMilestoneInput): Promise<Milestone> {
    throw new Error(
      `GitHubBoardAdapter.createMilestone not yet implemented (${this.repoOwner}/${this.repoName})`,
    );
  }

  async createIssue(_input: CreateIssueInput): Promise<BoardIssue> {
    throw new Error('GitHubBoardAdapter.createIssue not yet implemented');
  }

  async listMilestones(): Promise<Milestone[]> {
    throw new Error('GitHubBoardAdapter.listMilestones not yet implemented');
  }

  async listIssues(_milestoneId?: string): Promise<BoardIssue[]> {
    throw new Error('GitHubBoardAdapter.listIssues not yet implemented');
  }
}
