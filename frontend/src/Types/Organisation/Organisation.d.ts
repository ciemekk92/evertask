import { Project } from '../Project';
import { User } from '../User';

export type OrganisationPayload = {
  name: string;
  description: string;
};

export type Organisation = AuditedEntity &
  OrganisationPayload & {
    projects: Project[];
    members: User[];
  };
