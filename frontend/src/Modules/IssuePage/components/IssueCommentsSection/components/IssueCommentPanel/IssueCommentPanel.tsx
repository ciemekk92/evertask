import React from 'react';
import { UserCircle } from 'Shared/UserCircle';
import { Issue } from 'Types/Issue';
import { formatDateForDisplayWithTime } from 'Utils/formatDate';
import {
  StyledCommentHeadingRow,
  StyledCommentWrapper,
  StyledUserField
} from './IssueCommentPanel.styled';
import { StyledFlexColumnContainer } from 'Shared/SharedStyles.styled';

interface Props {
  comment: Issue.IssueComment;
}

export const IssueCommentPanel = ({ comment }: Props): JSX.Element => {
  const userFullName = React.useMemo(
    () => `${comment.createdBy.firstName} ${comment.createdBy.lastName}`,
    [comment]
  );

  const renderReplies = (): Nullable<JSX.Element> => {
    if (!comment.replies.length) {
      return null;
    }

    return (
      <StyledFlexColumnContainer>
        <IssueCommentPanel comment={comment.replies[0]} />
      </StyledFlexColumnContainer>
    );
  };

  return (
    <StyledCommentWrapper>
      <StyledCommentHeadingRow>
        <StyledUserField>
          <UserCircle label={userFullName} imageSrc={comment.createdBy.avatar} />
          <p>{userFullName}</p>
        </StyledUserField>
        <p>{formatDateForDisplayWithTime(comment.createdAt)}</p>
      </StyledCommentHeadingRow>
      <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
    </StyledCommentWrapper>
  );
};
