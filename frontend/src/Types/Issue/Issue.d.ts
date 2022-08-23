import { ISSUE_PRIORITY, ISSUE_STATUS, ISSUE_TYPE } from 'Shared/constants';
import { Project } from '../Project';
import { Sprint } from '../Sprint';
import { User } from '../User';

declare namespace Issue {
  interface IssueBase extends AuditedEntity {
    key: number;
    title: string;
    description: string;
    estimateStoryPoints: Nullable<number>;
    estimateHours: Nullable<number>;
    pullRequestUrl: string;
    status: ISSUE_STATUS;
    type: ISSUE_TYPE;
    parentId: Nullable<Id>;
    priority: ISSUE_PRIORITY;
    subtasks: Issue.IssueFullEntity[];
  }

  interface IssueComment extends AuditedEntity {
    parentId?: Nullable<Id>;
    createdBy: User.UserBasicEntity;
    content: string;
    firstReply: Nullable<Issue.IssueComment>;
    hasMoreReplies: boolean;
  }

  export interface IssueEntity extends IssueBase {
    projectId: Id;
    assigneeId: Id;
    reporterId: Id;
    sprintId: Id;
  }

  export interface IssueFullEntity extends IssueBase {
    project: Project.ProjectInfoEntity;
    sprint: Nullable<Sprint.SprintInfoEntity>;
    assignee: Nullable<User.UserBasicEntity>;
    reporter: User.UserBasicEntity;
  }

  interface PaginatedUnassignedIssues extends Util.PaginationProps {
    issues: Issue.IssueFullEntity[];
  }
}
