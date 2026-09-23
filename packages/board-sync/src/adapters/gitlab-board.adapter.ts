import type { BoardIssue, Milestone } from '@dev-companion/shared';
import type {
  BoardProviderAdapter,
  CreateIssueInput,
  CreateMilestoneInput,
} from '../interfaces/board-provider.js';

/**
 * Placeholder for GitLab REST/GraphQL integration.
 * @see https://docs.gitlab.com/ee/api/graphql/
 */
export class GitLabBoardAdapter implements BoardProviderAdapter {
  readonly provider = 'gitlab' as const;

  constructor(
    readonly repoOwner: string,
    readonly repoName: string,
    private readonly accessToken: string,
  ) {}

  async createMilestone(_input: CreateMilestoneInput): Promise<Milestone> {
    throw new Error(
      `GitLabBoardAdapter.createMilestone not yet implemented (${this.repoOwner}/${this.repoName})`,
    );
  }

  async createIssue(_input: CreateIssueInput): Promise<BoardIssue> {
    throw new Error('GitLabBoardAdapter.createIssue not yet implemented');
  }

  async listMilestones(): Promise<Milestone[]> {
    throw new Error('GitLabBoardAdapter.listMilestones not yet implemented');
  }

  async listIssues(_milestoneId?: string): Promise<BoardIssue[]> {
    throw new Error('GitLabBoardAdapter.listIssues not yet implemented');
  }
}
