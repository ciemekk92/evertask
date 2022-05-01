import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { TextInput } from 'Shared/Elements/TextInput';
import { TextArea } from 'Shared/Elements/TextArea';
import { ButtonFilled } from 'Shared/Elements/Buttons';
import { FormField } from 'Shared/Elements/Form';

interface Props {
  handleSubmit: (values: Organisation.OrganisationPayload) => Promise<void>;
}

export const OrganisationForm = ({ handleSubmit }: Props): JSX.Element => {
  const { t } = useTranslation();

  const initialData: Organisation.OrganisationPayload = {
    name: '',
    description: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, t('organisationForm.validation.name.minLength'))
      .max(50, t('organisationForm.validation.name.maxLength'))
      .required(t('organisationForm.validation.name.required')),
    description: Yup.string()
  });

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={initialData}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        handleSubmit,
        isValid
      }: FormikProps<Organisation.OrganisationPayload>) => (
        <Form name="organisation" method="POST" onSubmit={handleSubmit}>
          <FormField label={t('organisationForm.name')} name="name">
            <TextInput
              valid={!errors.name && touched.name}
              error={errors.name && touched.name}
              name="name"
              type="text"
            />
          </FormField>
          <FormField label={t('organisationForm.description')} name="description">
            <TextArea
              valid={!errors.description && touched.description}
              error={errors.description && touched.description}
              name="description"
            />
          </FormField>
          <ButtonFilled type="submit" disabled={!isValid}>
            {t('general.submit')}
          </ButtonFilled>
        </Form>
      )}
    </Formik>
  );
};
