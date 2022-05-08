declare namespace User {
  export interface UserInfo {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  }

  export type UserEntity = IdentifiedEntity & UserInfo;
}
