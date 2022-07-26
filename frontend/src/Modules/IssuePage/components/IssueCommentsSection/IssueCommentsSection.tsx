import React from 'react';
import {useTranslation} from 'react-i18next';
import {IconButton} from 'Shared/Elements/Buttons';
import {StyledSectionHeaderRow} from 'Shared/PageWrappers';
import {Heading6} from 'Shared/Typography';
import {Issue} from 'Types/Issue';
import {Api} from 'Utils/Api';
import {CommentFormData, CommentsData} from '../../fixtures';
import {IssueCommentForm, IssueCommentPanel} from './components';
import {StyledCommentsSectionWrapper} from './IssueCommentsSection.styled';

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
  const {t} = useTranslation();
  const [isAddingComment, setIsAddingComment] = React.useState<boolean>(false);

  const handleShowingMoreComments = async () => {
    // TODO
    // 1. fetch replies to a comment
    // 2. change view.
  };

  const renderComments = (): JSX.Element | JSX.Element[] => {
    if (!issueComments.comments.length) {
      return <p>{t('issuePage.comments.noComments')}</p>;
    }

    return issueComments.comments.map((value: Issue.IssueComment) => (
      <IssueCommentPanel
        handleShowingMoreComments={handleShowingMoreComments}
        handleRefreshingComments={handleRefreshingComments}
        key={value.id}
        comment={value}
        issueId={issueId}
      />
    ));
  };

  const onSubmit = async (values: CommentFormData): Promise<void> => {
    const result = await Api.post(`issues/${issueId}/comments`, {...values});
    if (result.status === 200) {
      await handleRefreshingComments();
      setIsAddingComment(false);
    }
  };

  const handleTogglingEditing = (e: React.MouseEvent): void => {
    e.preventDefault();
    setIsAddingComment(!isAddingComment);
  };

  const renderCommentForm = (): Nullable<JSX.Element> => {
    if (!isAddingComment) {
      return null;
    }

    return <IssueCommentForm onSubmit={onSubmit} onClose={handleTogglingEditing}/>;
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
      {renderComments()}
    </StyledCommentsSectionWrapper>
  );
};
