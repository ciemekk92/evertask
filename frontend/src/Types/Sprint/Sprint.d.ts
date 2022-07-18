import { Issue } from '../Issue';

declare namespace Sprint {
  export type SprintEntity = AuditedEntity & {
    ordinal: number;
    completed: boolean;
    description: string;
    startDate: string;
    finishDate: string;
    projectId: Id;
  };

  export type SprintIssuesEntity = SprintEntity & {
    issues: Issue.IssueEntity[];
  };

  export interface SprintInfoEntity extends IdentifiedEntity {
    ordinal: number;
    description: string;
    completed: boolean;
    startDate: string;
    finishDate: string;
  }
}
