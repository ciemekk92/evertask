import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { useLoading } from 'Hooks/useLoading';
import { LoadingModalDialog } from 'Shared/LoadingModalDialog';
import { Form, FormField } from 'Shared/Elements/Form';
import { DateInput } from 'Shared/Elements/DateInput';
import { TextArea } from 'Shared/Elements/TextArea';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { Api } from 'Utils/Api';
import { actionCreators } from 'Stores/Project';
import { SPRINT_DIALOG_MODES } from './fixtures';
import { StyledDialogContent } from './SprintDialog.styled';

interface Props {
  mode: SPRINT_DIALOG_MODES;
  handleClose: VoidFunctionNoArgs;
  projectId: Id;
}

interface SprintData {
  description: string;
  startDate: string;
  finishDate: string;
}

export const SprintDialog = ({ mode, handleClose, projectId }: Props): JSX.Element => {
  const initialData: SprintData = {
    description: '',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    finishDate: format(new Date(), 'yyyy-MM-dd')
  };

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const validationSchema = Yup.object().shape({
    description: Yup.string().required('sprintDialog.validation.description.required'),
    startDate: Yup.date().required(t('sprintDialog.validation.startDate.required')),
    finishDate: Yup.date()
      .min(Yup.ref('startDate'), t('sprintDialog.validation.finishDate.min'))
      .required(t('sprintDialog.validation.finishDate.required'))
  });

  const onCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
  };

  const onSubmit = async (values: SprintData) => {
    startLoading();

    const result = await Api.post('sprints', { ...values, projectId });

    if (result.status === 201) {
      handleClose();
      dispatch(actionCreators.getSprints(projectId));
    }

    stopLoading();
  };

  const renderFooter = (isSubmitDisabled: boolean): JSX.Element => (
    <React.Fragment>
      <ButtonOutline onClick={onCancel}>{t('general.cancel')}</ButtonOutline>
      <ButtonFilled type="submit" disabled={isSubmitDisabled}>
        {t('general.submit')}
      </ButtonFilled>
    </React.Fragment>
  );

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={initialData}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, isValid }: FormikProps<SprintData>) => (
        <Form name="sprint" method="POST" onSubmit={handleSubmit}>
          <LoadingModalDialog
            isLoading={isLoading}
            header={t(`sprintDialog.title.${mode.toLowerCase()}`)}
            footer={renderFooter(!isValid)}
          >
            <StyledDialogContent>
              <FormField label={t('sprintDialog.startDate')} name="startDate">
                <DateInput name="startDate" />
              </FormField>
              <FormField label={t('sprintDialog.finishDate')} name="finishDate">
                <DateInput name="finishDate" />
              </FormField>
              <FormField label={t('sprintDialog.description')} name="description">
                <TextArea
                  name="description"
                  valid={!errors.description && touched.description}
                  error={errors.description && touched.description}
                />
              </FormField>
            </StyledDialogContent>
          </LoadingModalDialog>
        </Form>
      )}
    </Formik>
  );
};
