import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ModalDialog } from 'Shared/ModalDialog';
import { Form, FormField } from 'Shared/Elements/Form';
import { FormikDateInput } from 'Shared/Elements/DateInput';
import { TextArea } from 'Shared/Elements/TextArea';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { Api } from 'Utils/Api';
import { formatDateForInput } from 'Utils/formatDate';
import { SPRINT_DIALOG_MODES } from './fixtures';
import { StyledDialogContent } from './SprintDialog.styled';

interface Props {
  mode: SPRINT_DIALOG_MODES;
  handleClose: VoidFunctionNoArgs;
  handleSubmitting: VoidFunctionNoArgs;
  projectId: Id;
  sprintId?: Id;
}

interface SprintData {
  description: string;
  startDate: string;
  finishDate: string;
}

export const SprintDialog = ({
  mode,
  handleClose,
  handleSubmitting,
  projectId,
  sprintId
}: Props): JSX.Element => {
  const [initialData, setInitialData] = React.useState<SprintData>({
    description: '',
    startDate: formatDateForInput(new Date()),
    finishDate: formatDateForInput(new Date())
  });

  const { t } = useTranslation();

  React.useEffect(() => {
    if (sprintId && mode === SPRINT_DIALOG_MODES.EDIT) {
      Api.get(`sprints/${sprintId}`)
        .then((response) => response.json())
        .then((data: SprintData) =>
          setInitialData({
            description: data.description,
            startDate: formatDateForInput(data.startDate),
            finishDate: formatDateForInput(data.finishDate)
          })
        );
    }
  }, [sprintId, mode]);

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('sprintDialog.validation.description.required')),
    startDate: Yup.date().required(t('sprintDialog.validation.startDate.required')),
    finishDate: Yup.date()
      .min(Yup.ref('startDate'), t('sprintDialog.validation.finishDate.min'))
      .required(t('sprintDialog.validation.finishDate.required'))
  });

  const onCancel = (e: React.MouseEvent): void => {
    e.preventDefault();
    handleClose();
  };

  const onSubmit = async (values: SprintData): Promise<void> => {
    let result: Response;

    if (projectId) {
      if (!sprintId && mode === SPRINT_DIALOG_MODES.ADD) {
        result = await Api.post('sprints', { ...values, projectId });
      } else {
        result = await Api.put(`sprints/${sprintId}`, { ...values });
      }

      if ([201, 204].includes(result.status)) {
        handleSubmitting();
      }
    }
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
      enableReinitialize
    >
      {({ errors, touched, handleSubmit, isValid }: FormikProps<SprintData>) => (
        <Form name="sprint" method="POST" onSubmit={handleSubmit}>
          <ModalDialog
            header={t(`sprintDialog.title.${mode.toLowerCase()}`)}
            footer={renderFooter(!isValid)}
          >
            <StyledDialogContent>
              <FormField label={t('sprintDialog.startDate')} name="startDate">
                <FormikDateInput name="startDate" />
              </FormField>
              <FormField label={t('sprintDialog.finishDate')} name="finishDate">
                <FormikDateInput name="finishDate" />
              </FormField>
              <FormField label={t('sprintDialog.description')} name="description">
                <TextArea
                  name="description"
                  valid={!errors.description && touched.description}
                  error={errors.description && touched.description}
                />
              </FormField>
            </StyledDialogContent>
          </ModalDialog>
        </Form>
      )}
    </Formik>
  );
};
