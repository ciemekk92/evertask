import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonLikeLink, IconButton } from 'Shared/Elements/Buttons';
import { UserCircle } from 'Shared/UserCircle';
import { StyledFlexColumnContainer, StyledFlexContainer } from 'Shared/SharedStyles.styled';
import { Issue } from 'Types/Issue';
import { Api } from 'Utils/Api';
import { formatDateForDisplayWithTime } from 'Utils/formatDate';
import { IssueCommentForm } from '..';
import { CommentFormData } from '../../../../fixtures';
import {
  StyledCommentContent,
  StyledCommentHeadingRow,
  StyledCommentWrapper,
  StyledSingleCommentWrapper,
  StyledUserField
} from './IssueCommentPanel.styled';

interface Props {
  comment: Issue.IssueComment;
  issueId: Id;
  handleShowingMoreComments: VoidFunctionNoArgs;
  handleRefreshingComments: () => Promise<void>;
  isChildPanel?: boolean;
}

export const IssueCommentPanel = ({
  comment,
  issueId,
  handleShowingMoreComments,
  handleRefreshingComments,
  isChildPanel
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isReplying, setIsReplying] = React.useState<boolean>(false);
  const userFullName = React.useMemo(
    () => `${comment.createdBy.firstName} ${comment.createdBy.lastName}`,
    [comment]
  );

  const handleTogglingReplying = (e: React.MouseEvent): void => {
    e.preventDefault();
    setIsReplying(!isReplying);
  };

  const handleSubmittingReply = async (values: CommentFormData) => {
    const result = await Api.post(`issues/${issueId}/comments`, {
      ...values,
      parentId: comment.id
    });

    if (result.status === 200) {
      await handleRefreshingComments();
      setIsReplying(false);
    }
  };

  const renderReplyEditor = (): Nullable<JSX.Element> => {
    if (!isReplying) {
      return null;
    }

    return (
      <StyledFlexColumnContainer>
        <IssueCommentForm onClose={handleTogglingReplying} onSubmit={handleSubmittingReply} />
      </StyledFlexColumnContainer>
    );
  };

  const renderReplies = (): Nullable<JSX.Element> => {
    if (isChildPanel || !comment.firstReply) {
      return null;
    }

    return (
      <StyledFlexColumnContainer>
        <IssueCommentPanel
          handleShowingMoreComments={handleShowingMoreComments}
          handleRefreshingComments={handleRefreshingComments}
          issueId={issueId}
          comment={comment.firstReply}
          isChildPanel
        />
        {comment.hasMoreReplies && (
          <ButtonLikeLink>{t('issuePage.comments.showMore')}</ButtonLikeLink>
        )}
      </StyledFlexColumnContainer>
    );
  };

  return (
    <StyledCommentWrapper>
      <StyledSingleCommentWrapper>
        <StyledCommentHeadingRow>
          <StyledUserField>
            <UserCircle label={userFullName} imageSrc={comment.createdBy.avatar} />
            <p>{userFullName}</p>
          </StyledUserField>
          <p>{formatDateForDisplayWithTime(comment.createdAt)}</p>
        </StyledCommentHeadingRow>
        <StyledCommentContent dangerouslySetInnerHTML={{ __html: comment.content }} />
        {!isReplying && (
          <StyledFlexContainer>
            <IconButton onClick={handleTogglingReplying} iconName="reply">
              {t('issuePage.comments.reply')}
            </IconButton>
          </StyledFlexContainer>
        )}
      </StyledSingleCommentWrapper>
      {renderReplyEditor()}
      {renderReplies()}
    </StyledCommentWrapper>
  );
};
