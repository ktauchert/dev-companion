import type { ADR, BoardSyncResult, Epic, ProjectSpec } from '@dev-companion/shared';

export interface BoardSeedInput {
  projectId: string;
  spec: ProjectSpec;
  adrs: ADR[];
  epics: Epic[];
}

/**
 * Transforms specs and ADRs into structured milestones, epics, and issues on a linked board.
 */
export interface BoardSyncService {
  seedFromArtifacts(input: BoardSeedInput): Promise<BoardSyncResult>;
  syncProgress(projectId: string): Promise<BoardSyncResult>;
}
