import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { PROJECT_METHODOLOGIES } from 'Shared/constants';
import { ModalDialog } from 'Shared/ModalDialog';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { Form, FormField } from 'Shared/Elements/Form';
import { TextInput } from 'Shared/Elements/TextInput';
import { TextArea } from 'Shared/Elements/TextArea';
import { FormikRadio } from 'Shared/Elements/RadioField/RadioField';
import { Api } from 'Utils/Api';
import { actionCreators as userActionCreators } from 'Stores/User';
import { actionCreators as projectActionCreators } from 'Stores/Project';
import { StyledDialogContent } from './ProjectDialog.styled';

interface Props {
  mode: 'ADD' | 'EDIT';
  handleClose: VoidFunctionNoArgs;
}

interface ProjectData {
  name: string;
  description: string;
  code: string;
  methodology: PROJECT_METHODOLOGIES;
}

export const ProjectDialog = ({ mode, handleClose }: Props): JSX.Element => {
  const initialData: ProjectData = {
    name: '',
    description: '',
    code: '',
    methodology: PROJECT_METHODOLOGIES.KANBAN
  };

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('projectDialog.validation.name.minLength'))
      .max(30, t('projectDialog.validation.name.maxLength'))
      .required(t('projectDialog.validation.name.required')),
    code: Yup.string()
      .min(2, t('projectDialog.validation.code.minLength'))
      .max(6, t('projectDialog.validation.code.maxLength'))
      .matches(/^[A-ZŻŹĆĄŚĘŁÓŃ]+$/, t('projectDialog.validation.code.matches'))
      .required(t('projectDialog.validation.code.required')),
    methodology: Yup.string(),
    description: Yup.string().required(t('projectDialog.validation.description.required'))
  });

  const onCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
  };

  const onSubmit = async (values: ProjectData): Promise<void> => {
    const result = await Api.post('projects', { ...values });

    if (result.status === 201) {
      handleClose();
      dispatch(userActionCreators.getOrganisation());
      dispatch(projectActionCreators.getOrganisationsProjects());
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
    >
      {({ errors, touched, handleSubmit, isValid, setFieldValue }: FormikProps<ProjectData>) => (
        <Form name="project" method="POST" onSubmit={handleSubmit}>
          <ModalDialog
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
              <FormField name="code" label={t('projectDialog.code')}>
                <TextInput
                  valid={!errors.code && touched.code}
                  error={errors.code && touched.code}
                  name="code"
                  type="text"
                />
              </FormField>
              <FormField name="methodology" label={t('projectDialog.methodology')}>
                <FormikRadio
                  name="methodology"
                  value={PROJECT_METHODOLOGIES.KANBAN}
                  label={t('projectDialog.kanban')}
                  handleClick={setFieldValue}
                />
                <FormikRadio
                  name="methodology"
                  value={PROJECT_METHODOLOGIES.AGILE}
                  label={t('projectDialog.agile')}
                  handleClick={setFieldValue}
                />
              </FormField>
              <FormField name="description" label={t('projectDialog.description')}>
                <TextArea
                  valid={!errors.description && touched.description}
                  error={errors.description && touched.description}
                  name="description"
                />
              </FormField>
            </StyledDialogContent>
          </ModalDialog>
        </Form>
      )}
    </Formik>
  );
};
