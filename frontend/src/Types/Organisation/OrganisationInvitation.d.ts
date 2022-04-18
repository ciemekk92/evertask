import { Organisation } from './Organisation';

export type OrganisationInvitation = AuditedEntity & {
  organisation: Organisation;
};
