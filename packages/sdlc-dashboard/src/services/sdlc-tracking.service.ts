import type { ProjectProgress, SdlcPhase } from '@dev-companion/shared';
import type { SdlcTrackingService } from '../interfaces/sdlc-tracking.js';

/**
 * Placeholder — aggregates board and repo metrics for the dashboard.
 */
export class SdlcTrackingServiceImpl implements SdlcTrackingService {
  async getProgress(projectId: string): Promise<ProjectProgress> {
    return this.emptyProgress(projectId);
  }

  async getPhaseStatus(projectId: string, phase: SdlcPhase): Promise<ProjectProgress> {
    return { ...this.emptyProgress(projectId), phase };
  }

  async refreshFromBoard(projectId: string): Promise<ProjectProgress> {
    throw new Error(
      `SdlcTrackingService.refreshFromBoard not yet implemented (project: ${projectId})`,
    );
  }

  private emptyProgress(projectId: string): ProjectProgress {
    return {
      projectId,
      phase: 'ideation',
      milestonesTotal: 0,
      milestonesClosed: 0,
      issuesTotal: 0,
      issuesClosed: 0,
      adrsAccepted: 0,
      adrsTotal: 0,
      lastSyncedAt: new Date(),
    };
  }
}
