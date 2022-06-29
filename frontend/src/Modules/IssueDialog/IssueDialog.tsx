import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Form, FormField } from 'Shared/Elements/Form';
import { TextInput } from 'Shared/Elements/TextInput';
import { TextArea } from 'Shared/Elements/TextArea';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { SingleSelectDropdown } from 'Shared/Elements/SingleSelectDropdown';
import { LoadingModalDialog } from 'Shared/LoadingModalDialog';
import { ISSUE_PRIORITY, ISSUE_STATUS, ISSUE_TYPE } from 'Shared/constants';
import { useLoading } from 'Hooks/useLoading';
import { ApplicationState } from 'Stores/store';
import { Api } from 'Utils/Api';
import { ISSUE_DIALOG_MODES } from './fixtures';
import {
  mapIssuePrioritiesToDropdownOptions,
  mapIssueTypesToDropdownOptions,
  mapSprintsToDropdownOptions
} from './helpers';
import { StyledDialogContent } from './IssueDialog.styled';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';

interface Props {
  mode: ISSUE_DIALOG_MODES;
  initialSprintId: Nullable<Id>;
  handleClose: VoidFunctionNoArgs;
}

interface IssueData {
  title: string;
  description: string;
  estimateStoryPoints: number;
  estimateHours: number;
  pullRequestUrl: string;
  sprintId: Nullable<Id>;
  status: ISSUE_STATUS;
  type: ISSUE_TYPE;
  priority: ISSUE_PRIORITY;
}

export const IssueDialog = ({ mode, handleClose, initialSprintId }: Props) => {
  const initialData: IssueData = {
    title: '',
    description: '',
    estimateStoryPoints: 0,
    estimateHours: 0,
    pullRequestUrl: '',
    sprintId: initialSprintId,
    status: ISSUE_STATUS.TO_DO,
    type: ISSUE_TYPE.TASK,
    priority: ISSUE_PRIORITY.MEDIUM
  };

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const notCompletedSprints = useSelector(
    (state: ApplicationState) => (state.project ? state.project.notCompletedSprints : []),
    shallowEqual
  );
  const { isLoading, startLoading, stopLoading } = useLoading();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, t('issueDialog.validation.title.minLength'))
      .max(50, t('issueDialog.validation.title.maxLength'))
      .required(t('issueDialog.validation.title.required')),
    description: Yup.string()
      .max(2000, t('issueDialog.validation.description.maxLength'))
      .required(t('issueDialog.validation.description.required')),
    sprintId: Yup.string().nullable(),
    status: Yup.string(),
    priority: Yup.string(),
    pullRequestUrl: Yup.string().when('status', {
      is: 'CODE_REVIEW',
      then: Yup.string()
        .min(10, t('issueDialog.validation.pullRequestUrl.minLength'))
        .max(150, t('issueDialog.validation.pullRequestUrl.maxLength'))
        .required(t('issueDialog.validation.pullRequestUrl.required'))
    })
  });

  const onCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
  };

  const onSubmit = async (values: IssueData) => {
    startLoading();

    const result = await Api.post('issues', {
      ...values,
      projectId: CurrentProjectModel.currentProjectValue.id
    });

    if (result.status === 201) {
      handleClose();
      // TODO refresh after adding
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
      {({
        errors,
        touched,
        handleSubmit,
        isValid,
        setFieldValue,
        values
      }: FormikProps<IssueData>) => (
        <Form name="issue" method="POST" onSubmit={handleSubmit}>
          <LoadingModalDialog
            isLoading={isLoading}
            header={t(`issueDialog.header.${mode.toLowerCase()}`)}
            footer={renderFooter(!isValid)}
          >
            <StyledDialogContent>
              <FormField label={t('issueDialog.title')} name="title">
                <TextInput
                  valid={!errors.title && touched.title}
                  error={errors.title && touched.title}
                  name="title"
                  type="text"
                />
              </FormField>
              <FormField label={t('issueDialog.type')} name="type">
                <SingleSelectDropdown
                  options={mapIssueTypesToDropdownOptions()}
                  value={values.type}
                  onChange={(value: Nullable<string>) => setFieldValue('type', value)}
                />
              </FormField>
              <FormField label={t('issueDialog.priority')} name="priority">
                <SingleSelectDropdown
                  options={mapIssuePrioritiesToDropdownOptions()}
                  value={values.priority}
                  onChange={(value: Nullable<string>) => setFieldValue('priority', value)}
                />
              </FormField>
              <FormField label={t('issueDialog.estimateStoryPoints')} name="estimateStoryPoints">
                <TextInput
                  valid={!errors.estimateStoryPoints && touched.estimateStoryPoints}
                  error={errors.estimateStoryPoints && touched.estimateStoryPoints}
                  name="estimateStoryPoints"
                  type="number"
                />
              </FormField>
              <FormField label={t('issueDialog.estimateHours')} name="estimateHours">
                <TextInput
                  valid={!errors.estimateHours && touched.estimateHours}
                  error={errors.estimateHours && touched.estimateHours}
                  name="estimateHours"
                  type="number"
                />
              </FormField>
              <FormField label={t('issueDialog.pullRequestUrl')} name="pullRequestUrl">
                <TextInput
                  valid={!errors.pullRequestUrl && touched.pullRequestUrl}
                  error={errors.pullRequestUrl && touched.pullRequestUrl}
                  name="pullRequestUrl"
                  type="text"
                />
              </FormField>
              <FormField label={t('issueDialog.sprint')} name="sprintId">
                <SingleSelectDropdown
                  options={mapSprintsToDropdownOptions(notCompletedSprints)}
                  value={values.sprintId}
                  onChange={(value: Nullable<Id>) => setFieldValue('sprintId', value)}
                />
              </FormField>
              <FormField label={t('issueDialog.description')} name="description">
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
