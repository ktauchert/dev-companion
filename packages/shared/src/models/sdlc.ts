export type SdlcPhase =
  | 'ideation'
  | 'architecture'
  | 'planning'
  | 'development'
  | 'testing'
  | 'deployment'
  | 'retrospective';

export interface ProjectProgress {
  projectId: string;
  phase: SdlcPhase;
  milestonesTotal: number;
  milestonesClosed: number;
  issuesTotal: number;
  issuesClosed: number;
  adrsAccepted: number;
  adrsTotal: number;
  lastSyncedAt: Date;
}

export interface AdrComplianceResult {
  pullRequestId: string;
  pullRequestUrl: string;
  compliant: boolean;
  violations: AdrViolation[];
  checkedAt: Date;
}

export interface AdrViolation {
  adrNumber: number;
  adrTitle: string;
  description: string;
  severity: 'warning' | 'error';
}
