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
import { COMMENT_MODE } from './fixtures';
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
  handleShowingMoreComments: (comment: Issue.IssueComment) => VoidFunctionNoArgs;
  handleRefreshingComments: () => Promise<void>;
  handleConfirmingDelete: (id: Id) => () => Promise<void>;
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
  const [commentMode, setCommentMode] = React.useState<COMMENT_MODE>(COMMENT_MODE.REPLY);

  const userFullName = React.useMemo(
    () => `${comment.createdBy.firstName} ${comment.createdBy.lastName}`,
    [comment]
  );

  const currentUser = UserModel.currentUserValue;

  const handleTogglingEditor =
    (mode: COMMENT_MODE) =>
    (e: React.MouseEvent): void => {
      e.preventDefault();
      setCommentMode(mode);
      setIsEditorOpen(!isEditorOpen);
    };

  const handleSubmitting = (mode: COMMENT_MODE) => async (values: CommentFormData) => {
    let result: Response;

    if (mode === COMMENT_MODE.REPLY) {
      result = await Api.post(`issues/${rest.issueId}/comments`, {
        ...values,
        parentId: comment.id
      });
    } else {
      result = await Api.put(`issues/${rest.issueId}/comments/${comment.id}`, { ...values });
    }

    if ([201, 204].includes(result.status)) {
      await rest.handleRefreshingComments();
      setIsEditorOpen(false);
    }
  };

  const renderEditor = (): Nullable<JSX.Element> => {
    if (!isEditorOpen) {
      return null;
    }

    const initialEditorData: CommentFormData | undefined =
      commentMode === COMMENT_MODE.EDIT ? { content: comment.content } : undefined;

    return (
      <StyledFlexColumnContainer>
        <IssueCommentForm
          initialFormData={initialEditorData}
          onClose={handleTogglingEditor(commentMode)}
          onSubmit={handleSubmitting(commentMode)}
        />
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
          <ButtonLikeLink onClick={rest.handleShowingMoreComments(comment.firstReply)}>
            {t('issuePage.comments.showMore')}
          </ButtonLikeLink>
        </StyledFlexColumnContainer>
      );
    }

    return (
      <StyledFlexColumnContainer>
        <IssueCommentPanel {...rest} comment={comment.firstReply} isChildPanel />
        {comment.hasMoreReplies && (
          <ButtonLikeLink onClick={rest.handleShowingMoreComments(comment)}>
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
          <IconButton onClick={handleTogglingEditor(COMMENT_MODE.REPLY)} iconName="reply">
            {t('issuePage.comments.reply')}
          </IconButton>
          {currentUser.id === comment.createdBy.id && (
            <React.Fragment>
              <IconButton onClick={handleTogglingEditor(COMMENT_MODE.EDIT)} iconName="edit">
                {t('general.edit')}
              </IconButton>
              <IconButton onClick={rest.handleConfirmingDelete(comment.id)} iconName="delete">
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
