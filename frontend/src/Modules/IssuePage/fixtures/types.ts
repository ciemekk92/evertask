import { Issue } from 'Types/Issue';

export interface TimeTrackingData {
  estimatedHours: Nullable<number>;
  totalReportedHours: number;
  remainingHours: number;
}

export interface CommentsData extends Util.PaginationProps {
  comments: Issue.IssueComment[];
}

export interface CommentFormData {
  content: string;
}
