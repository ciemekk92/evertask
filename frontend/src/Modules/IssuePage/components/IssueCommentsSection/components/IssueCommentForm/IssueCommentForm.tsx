import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { Form } from 'Shared/Elements/Form';
import { WysiwygEditor } from 'Shared/WysiwygEditor';
import { CommentFormData } from '../../../../fixtures';
import { StyledButtonsContainer } from './IssueCommentForm.styled';

interface Props {
  onClose: (e: React.MouseEvent) => void;
  onSubmit: (values: CommentFormData) => Promise<void>;
}

export const IssueCommentForm = ({ onClose, onSubmit }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [initialData, setInitialData] = React.useState<CommentFormData>({ content: '' });

  const validationSchema = Yup.object().shape({
    content: Yup.string().min(9, t('issuePage.comments.validation.minLength'))
  });

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={initialData}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ initialValues, setFieldValue, isValid, handleSubmit }: FormikProps<CommentFormData>) => (
        <Form name="login" method="POST" onSubmit={handleSubmit}>
          <WysiwygEditor
            initialValue={initialValues.content}
            onChange={(value: string) => {
              setFieldValue('content', value);
            }}
          />
          <StyledButtonsContainer>
            <ButtonOutline onClick={onClose}>{t('general.cancel')}</ButtonOutline>
            <ButtonFilled disabled={!isValid} type="submit">
              {t('general.submit')}
            </ButtonFilled>
          </StyledButtonsContainer>
        </Form>
      )}
    </Formik>
  );
};
