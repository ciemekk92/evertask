import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps, Form } from 'formik';
import { useTranslation } from 'react-i18next';

import { TextInput } from 'Shared/Elements/TextInput';
import { TextArea } from 'Shared/Elements/TextArea';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { FormField } from 'Shared/Elements/Form';
import { Organisation } from 'Types/Organisation';
import { Api } from 'Utils/Api';
import { StyledFooterButtonContainer } from './OrganisationForm.styled';

interface EditModeConfig {
  organisationId?: Id;
  handleClose: VoidFunctionNoArgs;
}

interface Props {
  handleSubmit: (values: Organisation.OrganisationPayload) => Promise<void>;
  editModeConfig?: EditModeConfig;
}

export const OrganisationForm = ({ handleSubmit, editModeConfig }: Props): JSX.Element => {
  const { t } = useTranslation();

  const [initialData, setInitialData] = React.useState<Organisation.OrganisationPayload>({
    name: '',
    description: ''
  });

  React.useEffect(() => {
    if (editModeConfig) {
      Api.get(`organisations/${editModeConfig.organisationId}`)
        .then((response) => response.json())
        .then((data: Organisation.OrganisationPayload) =>
          setInitialData({ name: data.name, description: data.description })
        );
    }
  }, [editModeConfig, editModeConfig?.organisationId]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, t('organisationForm.validation.name.minLength'))
      .max(50, t('organisationForm.validation.name.maxLength'))
      .required(t('organisationForm.validation.name.required')),
    description: Yup.string()
  });

  const renderFooter = (): Nullable<JSX.Element> => {
    if (editModeConfig) {
      return (
        <StyledFooterButtonContainer>
          <ButtonOutline onClick={editModeConfig.handleClose}>{t('general.cancel')}</ButtonOutline>
          <ButtonFilled type="submit">{t('general.submit')}</ButtonFilled>
        </StyledFooterButtonContainer>
      );
    }

    return null;
  };

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={initialData}
      onSubmit={handleSubmit}
      enableReinitialize
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
          {!editModeConfig ? (
            <ButtonFilled type="submit" disabled={!isValid}>
              {t('general.submit')}
            </ButtonFilled>
          ) : (
            renderFooter()
          )}
        </Form>
      )}
    </Formik>
  );
};
