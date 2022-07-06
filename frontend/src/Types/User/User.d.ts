declare namespace User {
  export interface UserBasicInfo {
    firstName: string;
    lastName: string;
    avatar: string;
  }

  export interface UserFullInfo extends UserBasicInfo {
    username: string;
    email: string;
  }

  export type UserBasicEntity = IdentifiedEntity & UserBasicInfo;
  export type UserEntity = IdentifiedEntity & UserFullInfo;
}
