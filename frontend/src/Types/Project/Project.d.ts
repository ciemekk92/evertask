import { PROJECT_METHODOLOGIES } from 'Shared/constants';

declare namespace Project {
  export type ProjectEntity = AuditedEntity & {
    lastUpdatedAt: string;
    name: string;
    description: string;
    code: string;
    methodology: PROJECT_METHODOLOGIES;
    activeSprint: Nullable<Sprint.SprintEntity>;
  };
}
