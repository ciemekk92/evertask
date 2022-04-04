import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { LoadingModalDialog } from 'Shared/LoadingModalDialog';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { Form, FormField } from 'Shared/Elements/Form';
import { useLoading } from 'Hooks/useLoading';
import { TextInput } from 'Shared/Elements/TextInput';
import { TextArea } from 'Shared/Elements/TextArea';
import { Api } from 'Utils/Api';
import { actionCreators } from 'Stores/Project';
import { StyledDialogContent } from './ProjectDialog.styled';

interface Props {
  mode: 'ADD' | 'EDIT';
  handleClose: VoidFunctionNoArgs;
}

interface ProjectData {
  name: string;
  description: string;
}

export const ProjectDialog = ({ mode, handleClose }: Props): JSX.Element => {
  const initialData: ProjectData = {
    name: '',
    description: ''
  };

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('projectDialog.validation.name.minLength'))
      .max(30, t('projectDialog.validation.name.maxLength'))
      .required(t('projectDialog.validation.name.required')),
    description: Yup.string().required(t('projectDialog.validation.description.required'))
  });

  const renderFooter = (isSubmitDisabled: boolean): JSX.Element => (
    <React.Fragment>
      <ButtonOutline onClick={handleClose}>{t('general.cancel')}</ButtonOutline>
      <ButtonFilled type="submit" disabled={isSubmitDisabled}>
        {t('general.submit')}
      </ButtonFilled>
    </React.Fragment>
  );

  const onSubmit = async (values: ProjectData) => {
    startLoading();

    const result = await Api.post('projects', { ...values });

    if (result.status === 201) {
      handleClose();
      stopLoading();
      dispatch(actionCreators.getUserProjects());
    }
  };

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={initialData}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, isValid }: FormikProps<ProjectData>) => (
        <Form name="project" method="POST" onSubmit={handleSubmit}>
          <LoadingModalDialog
            isLoading={isLoading}
            header={t(`projectDialog.title.${mode.toLowerCase()}`)}
            footer={renderFooter(!isValid)}
          >
            <StyledDialogContent>
              <FormField name="name" label={t('projectDialog.name')}>
                <TextInput
                  valid={!errors.name && touched.name}
                  error={errors.name && touched.name}
                  name="name"
                  type="text"
                />
              </FormField>
              <FormField label={t('projectDialog.description')} name="description">
                <TextArea
                  valid={!errors.description && touched.description}
                  error={errors.description && touched.description}
                  name="description"
                />
              </FormField>
            </StyledDialogContent>
          </LoadingModalDialog>
        </Form>
      )}
    </Formik>
  );
};
