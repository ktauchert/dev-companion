export type DeploymentTarget = 'docker' | 'render' | 'aws' | 'azure' | 'self-hosted';

/**
 * Post-coding deployment guide generated from project specs, ADRs, and stack choices.
 */
export interface DeploymentGuide {
  id: string;
  projectId: string;
  title: string;
  summary: string;
  target: DeploymentTarget;
  prerequisites: string[];
  environmentVariables: DeploymentEnvVar[];
  steps: DeploymentStep[];
  verificationChecklist: string[];
  markdownContent: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeploymentEnvVar {
  name: string;
  description: string;
  required: boolean;
  example?: string;
}

export interface DeploymentStep {
  order: number;
  title: string;
  description: string;
  command?: string;
}
