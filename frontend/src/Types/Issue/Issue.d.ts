import { ISSUE_PRIORITY, ISSUE_STATUS, ISSUE_TYPE } from 'Shared/constants';

declare namespace Issue {
  export interface IssueEntity {
    readonly id: Id;
    readonly createdAt: string;
    readonly updatedAt: string;
    key: number;
    title: string;
    description: string;
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
    subtasks: Issue.IssueEntity[];
  }
}
