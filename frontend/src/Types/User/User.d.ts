declare namespace User {
  export interface UserReducedInfo {
    firstName: string;
    lastName: string;
    avatar: string;
  }

  export interface UserFullInfo extends UserReducedInfo {
    username: string;
    email: string;
  }

  export type UserEntity = IdentifiedEntity & UserFullInfo;
}
