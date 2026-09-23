import type { BoardSyncResult } from '@dev-companion/shared';
import type { BoardSyncService, BoardSeedInput } from '../interfaces/board-sync.js';
import type { BoardProviderAdapter } from '../interfaces/board-provider.js';

/**
 * Placeholder — orchestrates milestone/epic/issue creation from project artifacts.
 */
export class BoardSyncServiceImpl implements BoardSyncService {
  constructor(private readonly board: BoardProviderAdapter) {}

  async seedFromArtifacts(_input: BoardSeedInput): Promise<BoardSyncResult> {
    throw new Error(
      `BoardSyncService.seedFromArtifacts not yet implemented (provider: ${this.board.provider})`,
    );
  }

  async syncProgress(_projectId: string): Promise<BoardSyncResult> {
    throw new Error('BoardSyncService.syncProgress not yet implemented');
  }
}
