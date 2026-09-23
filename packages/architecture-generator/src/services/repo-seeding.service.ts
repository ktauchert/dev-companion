import type { RepoSeedInput, RepoSeedResult, RepoSeedingService } from '../interfaces/repo-seeding.js';

/**
 * Placeholder — builds file tree for greenfield repo seeding.
 */
export class RepoSeedingServiceImpl implements RepoSeedingService {
  async buildArtifacts(input: RepoSeedInput): Promise<RepoSeedResult> {
    const artifacts = [
      { path: 'README.md', content: input.readmeMarkdown },
      { path: 'spec.md', content: this.formatSpec(input.spec) },
      ...input.adrs.map((adr) => ({
        path: `docs/adr/ADR-${String(adr.number).padStart(3, '0')}-${this.slugify(adr.title)}.md`,
        content: adr.markdownContent,
      })),
    ];

    return {
      artifacts,
      commitMessage: `chore: seed project documentation and ${input.adrs.length} ADR(s)`,
    };
  }

  async pushToRepo(_input: RepoSeedInput, _accessToken: string): Promise<void> {
    throw new Error('RepoSeedingService.pushToRepo not yet implemented');
  }

  private formatSpec(spec: RepoSeedInput['spec']): string {
    return [
      `# ${spec.title}`,
      '',
      spec.summary,
      '',
      '## Problem',
      spec.problemStatement,
      '',
      '## Target Users',
      ...spec.targetUsers.map((u) => `- ${u}`),
      '',
      '## Goals',
      ...spec.goals.map((g) => `- ${g}`),
      '',
      '## Acceptance Criteria',
      ...spec.acceptanceCriteria.map((c) => `- ${c}`),
    ].join('\n');
  }

  private slugify(title: string): string {
    return title
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
