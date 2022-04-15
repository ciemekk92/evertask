export enum USER_ROLES {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
  ROLE_PROJECT_ADMIN = 'ROLE_PROJECT_ADMIN',
  ROLE_ORGANISATION_ADMIN = 'ROLE_ORGANISATION_ADMIN'
}

export enum NOTIFICATION_TYPES {
  SIGNUP = 'signup',
  PASSWORD = 'password'
}

export enum ICON_SIZE {
  SMALL = 18,
  MEDIUM = 24,
  LARGE = 36,
  XL = 48,
  XXL = 96
}

export const EMAIL_PATTERN = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
