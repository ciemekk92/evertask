import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, FormikErrors, FormikProps, FormikTouched } from 'formik';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { Form, FormField } from 'Shared/Elements/Form';
import { TextInput } from 'Shared/Elements/TextInput';
import { ModalDialog } from 'Shared/ModalDialog';
import { Api } from 'Utils/Api';
import { StyledDialogContent, StyledInputsContainer } from './ReportTimeDialog.styled';

interface Props {
  handleClose: VoidFunctionNoArgs;
  handleSubmitting: VoidFunctionNoArgs;
  issueId: Id;
}

interface ReportTimeData {
  weeks: number;
  days: number;
  hours: number;
}

export const ReportTimeDialog = ({
  handleClose,
  handleSubmitting,
  issueId
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const initialData = {
    weeks: 0,
    days: 0,
    hours: 0
  };

  const validationSchema = Yup.object().shape({
    weeks: Yup.string().nullable(),
    days: Yup.string().nullable(),
    hours: Yup.string().nullable()
  });

  const onCancel = (e: React.MouseEvent): void => {
    e.preventDefault();
    handleClose();
  };

  const renderFooter = (isSubmitDisabled: boolean): JSX.Element => (
    <React.Fragment>
      <ButtonOutline onClick={onCancel}>{t('general.cancel')}</ButtonOutline>
      <ButtonFilled type="submit" disabled={isSubmitDisabled}>
        {t('general.submit')}
      </ButtonFilled>
    </React.Fragment>
  );

  const handleChangeFactory =
    (
      fieldName: keyof ReportTimeData,
      changeCb: (field: string, value: string, shouldValidate?: boolean) => void
    ) =>
    ({ target: { validity, value } }: React.ChangeEvent<HTMLInputElement>): void => {
      if (validity.valid) {
        changeCb(fieldName, value);
      }
    };

  const formFieldFactory = (
    fieldName: keyof ReportTimeData,
    errors: FormikErrors<ReportTimeData>,
    touched: FormikTouched<ReportTimeData>,
    changeCb: (field: string, value: string, shouldValidate?: boolean) => void
  ): JSX.Element => (
    <FormField label={t(`reportTimeDialog.${fieldName}`)} name={fieldName}>
      <TextInput
        valid={!errors[fieldName] && touched[fieldName]}
        error={errors[fieldName] && touched[fieldName]}
        name={fieldName}
        pattern="[0-9]*"
        type="text"
        onChange={handleChangeFactory(fieldName, changeCb)}
      />
    </FormField>
  );

  const onSubmit = async (values: ReportTimeData): Promise<void> => {
    const reportedHours = (values.weeks * 5 + values.days) * 8 + values.hours;
    const result = await Api.post(`issues/${issueId}/time_tracking`, { issueId, reportedHours });

    if (result.status === 200) {
      handleSubmitting();
    }
  };

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={initialData}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, handleSubmit, setFieldValue, isValid }: FormikProps<ReportTimeData>) => (
        <Form name="timeTracking" method="POST" onSubmit={handleSubmit}>
          <ModalDialog header={t('reportTimeDialog.header')} footer={renderFooter(!isValid)}>
            <StyledDialogContent>
              <p>{t('reportTimeDialog.numbersExplanation')}</p>
              <StyledInputsContainer>
                {formFieldFactory('weeks', errors, touched, setFieldValue)}
                {formFieldFactory('days', errors, touched, setFieldValue)}
                {formFieldFactory('hours', errors, touched, setFieldValue)}
              </StyledInputsContainer>
            </StyledDialogContent>
          </ModalDialog>
        </Form>
      )}
    </Formik>
  );
};
