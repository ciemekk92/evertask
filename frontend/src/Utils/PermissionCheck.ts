import { USER_ROLES } from 'Shared/constants';

export const PermissionCheck = {
  isAdmin: (role: USER_ROLES) => [USER_ROLES.ROLE_ADMIN].includes(role),
  isOrganisationAdmin: (role: USER_ROLES) =>
    [USER_ROLES.ROLE_ORGANISATION_ADMIN, USER_ROLES.ROLE_ADMIN].includes(role),
  isProjectAdmin: (role: USER_ROLES) =>
    [
      USER_ROLES.ROLE_PROJECT_ADMIN,
      USER_ROLES.ROLE_ORGANISATION_ADMIN,
      USER_ROLES.ROLE_ADMIN
    ].includes(role),
  isAssignedUser: (role: USER_ROLES) => role !== USER_ROLES.ROLE_UNASSIGNED_USER,
  isUnassignedUser: (role: USER_ROLES) => role === USER_ROLES.ROLE_UNASSIGNED_USER
};
