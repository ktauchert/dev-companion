export type BoardProvider = 'github' | 'gitlab';

export type IssueState = 'open' | 'closed';

export type IssueType = 'epic' | 'story' | 'task' | 'bug';

/**
 * Provider-agnostic board issue. Maps to GitHub Issues or GitLab Issues.
 */
export interface BoardIssue {
  id: string;
  externalId: string;
  provider: BoardProvider;
  projectId: string;
  milestoneId?: string;
  parentIssueId?: string;
  type: IssueType;
  title: string;
  body: string;
  acceptanceCriteria: string[];
  labels: string[];
  state: IssueState;
  /** External URL (e.g. https://github.com/org/repo/issues/42). */
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Alias for GitHub-centric naming in API surfaces. */
export type GitHubIssue = BoardIssue & { provider: 'github' };

export interface Milestone {
  id: string;
  externalId: string;
  provider: BoardProvider;
  projectId: string;
  title: string;
  description: string;
  dueDate?: Date;
  state: 'open' | 'closed';
  url: string;
}

export interface Epic {
  id: string;
  title: string;
  description: string;
  milestoneId?: string;
  acceptanceCriteria: string[];
  stories: BoardIssue[];
}

export interface BoardSyncResult {
  milestonesCreated: number;
  epicsCreated: number;
  issuesCreated: number;
  errors: BoardSyncError[];
}

export interface BoardSyncError {
  entityType: 'milestone' | 'epic' | 'issue';
  title: string;
  message: string;
}
