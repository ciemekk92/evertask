import { INTERFACE_LANGUAGE } from 'Shared/constants';

declare namespace User {
  export interface UserSettings {
    darkMode: boolean;
    interfaceLanguage: INTERFACE_LANGUAGE;
    interfaceColor: string;
  }

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
    userSettings: User.UserSettings;
  }

  export type UserBasicEntity = IdentifiedEntity & UserBasicInfo;
  export type UserEntity = IdentifiedEntity & UserFullInfo;
}
