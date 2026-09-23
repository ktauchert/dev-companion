export type AdrStatus = 'proposed' | 'accepted' | 'deprecated' | 'superseded';

/**
 * Architecture Decision Record — persisted in the target repo under docs/adr/.
 */
export interface ADR {
  id: string;
  projectId: string;
  /** Sequential ADR number (001, 002 …). */
  number: number;
  title: string;
  status: AdrStatus;
  context: string;
  decision: string;
  consequences: string;
  /** Full markdown body, including frontmatter if used. */
  markdownContent: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdrDraft {
  title: string;
  context: string;
  decision: string;
  consequences: string;
}
