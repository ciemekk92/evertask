import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ButtonFilled, ButtonOutline, IconButton } from 'Shared/Elements/Buttons';
import { Form } from 'Shared/Elements/Form';
import { StyledSectionHeaderRow } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { WysiwygEditor } from 'Shared/WysiwygEditor';
import { Issue } from 'Types/Issue';
import { Api } from 'Utils/Api';
import { CommentsData } from '../../fixtures';
import { IssueCommentPanel } from './components';
import {
  StyledButtonsContainer,
  StyledCommentsSectionWrapper
} from './IssueCommentsSection.styled';

interface Props {
  issueComments: CommentsData;
  issueId: Id;
  handleRefreshingComments: () => Promise<void>;
}

interface CommentData {
  content: string;
}

export const IssueCommentsSection = ({
  issueComments,
  issueId,
  handleRefreshingComments
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isAddingComment, setIsAddingComment] = React.useState<boolean>(false);
  const [initialData, setInitialData] = React.useState<CommentData>({ content: '' });

  const renderComments = (): JSX.Element | JSX.Element[] => {
    if (!issueComments.comments.length) {
      return <p>{t('issuePage.comments.noComments')}</p>;
    }

    return issueComments.comments.map((value: Issue.IssueComment) => (
      <IssueCommentPanel key={value.id} comment={value} />
    ));
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().min(9, t('issuePage.comments.validation.minLength'))
  });

  const onSubmit = async (values: CommentData): Promise<void> => {
    const result = await Api.post(`issues/${issueId}/comments`, { ...values });
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

    return (
      <Formik
        validateOnMount
        validationSchema={validationSchema}
        initialValues={initialData}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ initialValues, setFieldValue, isValid, handleSubmit }: FormikProps<CommentData>) => (
          <Form name="login" method="POST" onSubmit={handleSubmit}>
            <WysiwygEditor
              initialValue={initialValues.content}
              onChange={(value: string) => {
                setFieldValue('content', value);
              }}
            />
            <StyledButtonsContainer>
              <ButtonOutline onClick={handleTogglingEditing}>{t('general.cancel')}</ButtonOutline>
              <ButtonFilled disabled={!isValid} type="submit">
                {t('general.submit')}
              </ButtonFilled>
            </StyledButtonsContainer>
          </Form>
        )}
      </Formik>
    );
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
