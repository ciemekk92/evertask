declare namespace Organisation {
  export type OrganisationPayload = {
    name: string;
    description: string;
  };

  export type OrganisationEntity = AuditedEntity &
    OrganisationPayload & {
      projects: Project.ProjectEntity[];
      members: User.UserEntity[];
    };

  export type OrganisationInvitation = AuditedEntity & {
    organisation: OrganisationEntity;
    user: User.UserEntity;
  };
}
