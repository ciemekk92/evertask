export enum USER_ROLES {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
  ROLE_PROJECT_ADMIN = 'ROLE_PROJECT_ADMIN',
  ROLE_ORGANISATION_ADMIN = 'ROLE_ORGANISATION_ADMIN',
  ROLE_UNASSIGNED_USER = 'ROLE_UNASSIGNED_USER'
}

export enum INTERFACE_LANGUAGE {
  EN = 'EN',
  PL = 'PL'
}

export enum PROJECT_METHODOLOGIES {
  KANBAN = 'KANBAN',
  AGILE = 'AGILE'
}

export enum NOTIFICATION_TYPES {
  SIGNUP = 'signup',
  PASSWORD = 'password',
  RESET_PASSWORD = 'resetPassword'
}

export enum ISSUE_STATUS {
  TO_DO = 'TO_DO',
  ON_HOLD = 'ON_HOLD',
  IN_PROGRESS = 'IN_PROGRESS',
  CODE_REVIEW = 'CODE_REVIEW',
  TESTING = 'TESTING',
  COMPLETED = 'COMPLETED',
  ACCEPTED = 'ACCEPTED'
}

export enum ISSUE_TYPE {
  EPIC = 'EPIC',
  STORY = 'STORY',
  BUG = 'BUG',
  TASK = 'TASK',
  SUBTASK = 'SUBTASK'
}

export enum ISSUE_PRIORITY {
  ASAP = 'ASAP',
  VERY_HIGH = 'VERY_HIGH',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export enum ICON_SIZE {
  SMALL = 18,
  MEDIUM = 24,
  LARGE = 36,
  XL = 48,
  XXL = 96
}

export const CURRENT_PROJECT_KEY: string = 'CURRENT_PROJECT';
