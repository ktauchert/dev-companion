import type { BoardIssue, BoardProvider, Milestone } from '@dev-companion/shared';

export interface CreateMilestoneInput {
  title: string;
  description: string;
  dueDate?: Date;
}

export interface CreateIssueInput {
  title: string;
  body: string;
  milestoneId?: string;
  parentIssueId?: string;
  labels?: string[];
  acceptanceCriteria?: string[];
}

/**
 * Abstraction over GitHub and GitLab project board APIs (REST/GraphQL).
 */
export interface BoardProviderAdapter {
  readonly provider: BoardProvider;
  readonly repoOwner: string;
  readonly repoName: string;

  createMilestone(input: CreateMilestoneInput): Promise<Milestone>;
  createIssue(input: CreateIssueInput): Promise<BoardIssue>;
  listMilestones(): Promise<Milestone[]>;
  listIssues(milestoneId?: string): Promise<BoardIssue[]>;
}
