import { Issue } from 'Types/Issue';

export interface TimeTrackingData {
  estimatedHours: Nullable<number>;
  totalReportedHours: number;
  remainingHours: number;
}

export interface CommentsData {
  comments: Issue.IssueComment[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface CommentFormData {
  content: string;
}
