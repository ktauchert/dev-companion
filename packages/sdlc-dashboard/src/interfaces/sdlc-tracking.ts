import type { ProjectProgress, SdlcPhase } from '@dev-companion/shared';

/**
 * Aggregates progress across linked repos and boards for the SDLC dashboard.
 */
export interface SdlcTrackingService {
  getProgress(projectId: string): Promise<ProjectProgress>;
  getPhaseStatus(projectId: string, phase: SdlcPhase): Promise<ProjectProgress>;
  refreshFromBoard(projectId: string): Promise<ProjectProgress>;
}
