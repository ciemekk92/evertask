import React from 'react';
import { useTranslation } from 'react-i18next';
import { subDays } from 'date-fns';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ButtonFilled } from 'Shared/Elements/Buttons';
import { FormikDateInput } from 'Shared/Elements/DateInput';
import { FormField, Form } from 'Shared/Elements/Form';
import { formatDateForInput } from 'Utils/formatDate';
import { getISODateStringFromDate } from 'Utils/getISODateStringFromDate';
import { DateRangeData } from '../../fixtures';
import { StyledDateRangeWrapper, StyledPickersContainer } from './DateRangeSelect.styled';

interface Props {
  handleDateChange: (values: DateRangeData) => void;
}

export const DateRangeSelect = ({ handleDateChange }: Props): JSX.Element => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    startDate: Yup.date().required(t('sprintDialog.validation.startDate.required')),
    finishDate: Yup.date()
      .min(Yup.ref('startDate'), t('sprintDialog.validation.finishDate.min'))
      .required(t('sprintDialog.validation.finishDate.required'))
  });

  const initialData: DateRangeData = {
    startDate: formatDateForInput(subDays(new Date(), 7)),
    finishDate: formatDateForInput(new Date())
  };

  return (
    <Formik
      validateOnMount
      validateOnChange
      validationSchema={validationSchema}
      initialValues={initialData}
      onSubmit={handleDateChange}
      enableReinitialize
    >
      {({ handleSubmit, isValid }: FormikProps<DateRangeData>) => (
        <Form name="sprint" method="POST" onSubmit={handleSubmit}>
          <StyledDateRangeWrapper>
            <StyledPickersContainer>
              <FormField label={t('sprintDialog.startDate')} name="startDate">
                <FormikDateInput
                  min={getISODateStringFromDate(subDays(new Date(), 30))}
                  max={getISODateStringFromDate(new Date())}
                  name="startDate"
                />
              </FormField>
              <FormField label={t('sprintDialog.finishDate')} name="finishDate">
                <FormikDateInput
                  min={getISODateStringFromDate(subDays(new Date(), 30))}
                  max={getISODateStringFromDate(new Date())}
                  name="finishDate"
                />
              </FormField>
            </StyledPickersContainer>
            <ButtonFilled disabled={!isValid} type="submit">
              {t('general.submit')}
            </ButtonFilled>
          </StyledDateRangeWrapper>
        </Form>
      )}
    </Formik>
  );
};
