import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserModel } from 'Models/UserModel';
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
  handleShowingMoreComments: (commentId: Id) => VoidFunctionNoArgs;
  handleRefreshingComments: () => Promise<void>;
  handleConfirmingDelete: VoidFunctionNoArgs;
  handleEditingComment: VoidFunctionNoArgs;
  isChildPanel?: boolean;
  isExpanded?: boolean;
  isReply?: boolean;
}

export const IssueCommentPanel = ({
  comment,
  isChildPanel,
  isExpanded,
  isReply,
  ...rest
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isEditorOpen, setIsEditorOpen] = React.useState<boolean>(false);
  const userFullName = React.useMemo(
    () => `${comment.createdBy.firstName} ${comment.createdBy.lastName}`,
    [comment]
  );

  const currentUser = UserModel.currentUserValue;

  const handleTogglingReplying = (e: React.MouseEvent): void => {
    e.preventDefault();
    setIsEditorOpen(!isEditorOpen);
  };

  const handleSubmittingReply = async (values: CommentFormData) => {
    const result = await Api.post(`issues/${rest.issueId}/comments`, {
      ...values,
      parentId: comment.id
    });

    if (result.status === 200) {
      await rest.handleRefreshingComments();
      setIsEditorOpen(false);
    }
  };

  const renderEditor = (): Nullable<JSX.Element> => {
    if (!isEditorOpen) {
      return null;
    }

    return (
      <StyledFlexColumnContainer>
        <IssueCommentForm onClose={handleTogglingReplying} onSubmit={handleSubmittingReply} />
      </StyledFlexColumnContainer>
    );
  };

  const renderReplies = (): Nullable<JSX.Element> => {
    if (!comment.firstReply || isExpanded) {
      return null;
    }

    if (isChildPanel && comment.firstReply.hasMoreReplies) {
      return (
        <StyledFlexColumnContainer>
          <ButtonLikeLink onClick={rest.handleShowingMoreComments(comment.firstReply.id)}>
            {t('issuePage.comments.showMore')}
          </ButtonLikeLink>
        </StyledFlexColumnContainer>
      );
    }

    return (
      <StyledFlexColumnContainer>
        <IssueCommentPanel {...rest} comment={comment.firstReply} isChildPanel />
        {comment.hasMoreReplies && (
          <ButtonLikeLink onClick={rest.handleShowingMoreComments(comment.id)}>
            {t('issuePage.comments.showMore')}
          </ButtonLikeLink>
        )}
      </StyledFlexColumnContainer>
    );
  };

  return (
    <StyledCommentWrapper isReply={isReply} isChildPanel={isChildPanel}>
      <StyledSingleCommentWrapper isReply={isReply}>
        <StyledCommentHeadingRow>
          <StyledUserField>
            <UserCircle label={userFullName} imageSrc={comment.createdBy.avatar} />
            <p>{userFullName}</p>
          </StyledUserField>
          <p>{formatDateForDisplayWithTime(comment.createdAt)}</p>
        </StyledCommentHeadingRow>
        <StyledCommentContent dangerouslySetInnerHTML={{ __html: comment.content }} />
        <StyledFlexContainer>
          <IconButton onClick={handleTogglingReplying} iconName="reply">
            {t('issuePage.comments.reply')}
          </IconButton>
          {currentUser.id === comment.createdBy.id && (
            <React.Fragment>
              <IconButton onClick={rest.handleEditingComment} iconName="edit">
                {t('general.edit')}
              </IconButton>
              <IconButton onClick={rest.handleConfirmingDelete} iconName="delete">
                {t('general.delete')}
              </IconButton>
            </React.Fragment>
          )}
        </StyledFlexContainer>
      </StyledSingleCommentWrapper>
      {renderEditor()}
      {renderReplies()}
    </StyledCommentWrapper>
  );
};
