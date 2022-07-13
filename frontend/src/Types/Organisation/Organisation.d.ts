import { Project } from '../Project';

declare namespace Organisation {
  export type OrganisationPayload = {
    name: string;
    description: string;
  };

  export type OrganisationEntity = AuditedEntity &
    OrganisationPayload & {
      projects: Project.ProjectEntity[];
      members: User.UserBasicEntity[];
    };

  export type OrganisationInvitation = AuditedEntity & {
    organisation: OrganisationEntity;
    user: User.UserEntity;
  };
}
