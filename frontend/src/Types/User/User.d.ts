declare namespace User {
  export interface UserBasicInfo {
    firstName: string;
    lastName: string;
    avatar: Nullable<string>;
  }

  export interface UserFullInfo extends UserBasicInfo {
    id: Id;
    username: string;
    email: string;
    bio: Nullable<string>;
    phoneNumber: Nullable<string>;
  }

  export type UserBasicEntity = IdentifiedEntity & UserBasicInfo;
  export type UserEntity = IdentifiedEntity & UserFullInfo;
}
