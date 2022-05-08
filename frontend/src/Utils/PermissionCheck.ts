import { USER_ROLES } from 'Shared/constants';
import { UserModel } from 'Models/UserModel';

type RoleCallback = (role: USER_ROLES) => boolean;

export class PermissionCheck {
  public static get isAdmin(): boolean {
    return this.checkCurrentUserAuthorities((role: USER_ROLES) => role === USER_ROLES.ROLE_ADMIN);
  }

  public static get isOrganisationAdmin(): boolean {
    return this.checkCurrentUserAuthorities((role: USER_ROLES) =>
      [USER_ROLES.ROLE_ORGANISATION_ADMIN, USER_ROLES.ROLE_ADMIN].includes(role)
    );
  }

  public static get isProjectAdmin(): boolean {
    return this.checkCurrentUserAuthorities((role: USER_ROLES) =>
      [
        USER_ROLES.ROLE_PROJECT_ADMIN,
        USER_ROLES.ROLE_ORGANISATION_ADMIN,
        USER_ROLES.ROLE_ADMIN
      ].includes(role)
    );
  }

  public static get isAssignedUser(): boolean {
    return this.checkCurrentUserAuthorities(
      (role: USER_ROLES) => role !== USER_ROLES.ROLE_UNASSIGNED_USER
    );
  }

  public static get isUnassignedUser(): boolean {
    return this.checkCurrentUserAuthorities(
      (role: USER_ROLES) => role === USER_ROLES.ROLE_UNASSIGNED_USER
    );
  }

  private static checkCurrentUserAuthorities(cb: RoleCallback): boolean {
    return UserModel.currentUserValue.authorities.some(cb);
  }
}
