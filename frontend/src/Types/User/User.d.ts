export interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type User = IdentifiedEntity & UserInfo;
