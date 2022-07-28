import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonLikeLink, IconButton } from 'Shared/Elements/Buttons';
import { StyledSectionHeaderRow } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { Issue } from 'Types/Issue';
import { Api } from 'Utils/Api';
import { CommentFormData, CommentsData } from '../../fixtures';
import { IssueCommentForm, IssueCommentPanel } from './components';
import { StyledCommentsSectionWrapper } from './IssueCommentsSection.styled';

interface Props {
  issueComments: CommentsData;
  issueId: Id;
  handleRefreshingComments: () => Promise<void>;
}

export const IssueCommentsSection = ({
  issueComments,
  issueId,
  handleRefreshingComments
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isAddingComment, setIsAddingComment] = React.useState<boolean>(false);
  const [repliesData, setRepliesData] = React.useState<Nullable<CommentsData>>(null);
  const [commentBeingShown, setCommentBeingShown] =
    React.useState<Nullable<Issue.IssueComment>>(null);

  const handleShowingMoreComments = (commentId: Id) => async (): Promise<void> => {
    const result = await Api.get(`issues/${issueId}/comments/${commentId}/replies`);

    if (result.status === 200) {
      const json = (await result.json()) as CommentsData;
      const shownComment = issueComments.comments.find(
        (value: Issue.IssueComment) => value.id === commentId
      );

      setRepliesData(json);
      if (shownComment) {
        setCommentBeingShown(shownComment);
      }
    }
  };

  const mapCommentsToPanels = (value: Issue.IssueComment): JSX.Element => (
    <IssueCommentPanel
      handleShowingMoreComments={handleShowingMoreComments}
      handleRefreshingComments={handleRefreshingComments}
      key={value.id}
      comment={value}
      issueId={issueId}
      isReply={!!repliesData}
    />
  );

  const handleTogglingEditing = (e: React.MouseEvent): void => {
    e.preventDefault();
    setIsAddingComment(!isAddingComment);
  };

  const handleGoingBack = async (): Promise<void> => {
    if (commentBeingShown && commentBeingShown.parentId) {
      await handleShowingMoreComments(commentBeingShown.parentId)();
    } else {
      setRepliesData(null);
      setCommentBeingShown(null);
      await handleRefreshingComments();
    }
  };

  const renderCommentForm = (): Nullable<JSX.Element> => {
    if (!isAddingComment) {
      return null;
    }

    return <IssueCommentForm onSubmit={onSubmit} onClose={handleTogglingEditing} />;
  };

  const renderCommentBeingShown = (): Nullable<JSX.Element> => {
    if (!repliesData || !commentBeingShown) {
      return null;
    }

    return (
      <React.Fragment>
        <ButtonLikeLink onClick={handleGoingBack}>{t('issuePage.comments.goBack')}</ButtonLikeLink>
        <IssueCommentPanel
          comment={commentBeingShown}
          issueId={issueId}
          handleShowingMoreComments={handleShowingMoreComments}
          handleRefreshingComments={handleRefreshingComments}
          isExpanded={!!repliesData}
        />
      </React.Fragment>
    );
  };

  const renderComments = (): JSX.Element | JSX.Element[] => {
    if (!issueComments.comments.length) {
      return <p>{t('issuePage.comments.noComments')}</p>;
    }

    if (repliesData) {
      return repliesData.comments.map(mapCommentsToPanels);
    }

    return issueComments.comments.map(mapCommentsToPanels);
  };

  const onSubmit = async (values: CommentFormData): Promise<void> => {
    const result = await Api.post(`issues/${issueId}/comments`, { ...values });
    if (result.status === 200) {
      await handleRefreshingComments();
      setIsAddingComment(false);
    }
  };

  return (
    <StyledCommentsSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('issuePage.comments.title')}</Heading6>
        <IconButton iconName="comment" onClick={handleTogglingEditing}>
          {t('issuePage.comments.addComment')}
        </IconButton>
      </StyledSectionHeaderRow>
      {renderCommentForm()}
      {renderCommentBeingShown()}
      {renderComments()}
    </StyledCommentsSectionWrapper>
  );
};
