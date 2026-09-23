/**
 * Structured project specification generated from an idea during greenfield seeding.
 */
export interface ProjectSpec {
  id: string;
  projectId: string;
  title: string;
  summary: string;
  problemStatement: string;
  targetUsers: string[];
  valueProposition: string;
  goals: string[];
  constraints: string[];
  acceptanceCriteria: string[];
  /** Semantic version of the spec document (1, 2, 3 …). */
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectSpecDraft {
  title: string;
  summary: string;
  problemStatement: string;
  targetUsers: string[];
  valueProposition: string;
  goals: string[];
  constraints: string[];
  acceptanceCriteria: string[];
}
