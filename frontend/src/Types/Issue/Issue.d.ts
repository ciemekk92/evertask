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
  TASK = BUG,
  SUBTASK = 'SUBTASK'
}

export enum ISSUE_PRIORITY {
  ASAP = 'ASAP',
  VERY_HIGH = 'VERY_HIGH',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface Issue {
  readonly id: Id;
  readonly createdAt: string;
  readonly updatedAt: string;
  title: string;
  estimateStoryPoints: number;
  estimateHours: number;
  pullRequestUrl: string;
  status: ISSUE_STATUS;
  type: ISSUE_TYPE;
  priority: ISSUE_PRIORITY;
  projectId: Id;
  parentId: Id;
  assigneeId: Id;
  reporterId: Id;
  sprintId: Id;
  subtasks: Issue[];
}
