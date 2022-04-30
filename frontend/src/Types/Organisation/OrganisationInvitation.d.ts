import { Organisation } from './Organisation';
import { User } from '../User';

export type OrganisationInvitation = AuditedEntity & {
  organisation: Organisation;
  user: User;
};
