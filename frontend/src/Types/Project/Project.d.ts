import { PROJECT_METHODOLOGIES } from 'Shared/constants';
import { Sprint } from '../Sprint';

declare namespace Project {
  export type ProjectEntity = AuditedEntity & {
    lastUpdatedAt: string;
    name: string;
    description: string;
    code: string;
    methodology: PROJECT_METHODOLOGIES;
    activeSprint: Nullable<Sprint.SprintEntity>;
    organisationId: Id;
  };

  export interface ProjectInfoEntity extends IdentifiedEntity {
    name: string;
    description: string;
    code: string;
    methodology: PROJECT_METHODOLOGIES;
  }
}
