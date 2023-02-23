import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { DROPDOWN_MENU_POSITION } from 'Shared/Elements/DropdownMenu';
import { DropdownWithSearch } from 'Shared/Elements/DropdownWithSearch';
import { Form, FormField } from 'Shared/Elements/Form';
import { SingleSelectDropdown } from 'Shared/Elements/SingleSelectDropdown';
import { TextInput } from 'Shared/Elements/TextInput';
import { ModalDialog } from 'Shared/ModalDialog';
import { UserCircle } from 'Shared/UserCircle';
import { WysiwygEditor } from 'Shared/WysiwygEditor';
import { ISSUE_PRIORITY, ISSUE_STATUS, ISSUE_TYPE, PROJECT_METHODOLOGIES } from 'Shared/constants';
import { StyledFlexContainerSpaceBetween } from 'Shared/SharedStyles.styled';
import { ApplicationState } from 'Stores/store';
import { actionCreators } from 'Stores/Organisation';
import { ApiResponse } from 'Types/Response';
import { Api } from 'Utils/Api';
import { convertNullFieldsToEmptyString } from 'Utils/convertNullFieldsToEmptyString';
import { mapUsersToDropdownOptions } from 'Utils/mapUsersToDropdownOptions';
import { ISSUE_DIALOG_MODES } from './fixtures';
import {
  mapIssuePrioritiesToDropdownOptions,
  mapIssueTypesToDropdownOptions,
  mapSprintsToDropdownOptions
} from './helpers';
import {
  StyledAssigneeField,
  StyledAssigneeLabel,
  StyledDialogContent
} from './IssueDialog.styled';

interface Props {
  mode: ISSUE_DIALOG_MODES;
  handleClose: VoidFunctionNoArgs;
  handleSubmitting: VoidFunctionNoArgs;
  initialSprintId?: Nullable<Id>;
  issueId?: Id;
  parentId?: Id;
  targetStatus?: ISSUE_STATUS;
}

interface IssueData {
  id: Nullable<Id>;
  title: string;
  description: string;
  estimateStoryPoints: Nullable<string>;
  estimateHours: Nullable<string>;
  pullRequestUrl: string;
  sprintId: Nullable<Id>;
  parentId: Nullable<Id>;
  assigneeId: Nullable<Id>;
  status: ISSUE_STATUS;
  type: ISSUE_TYPE;
  priority: ISSUE_PRIORITY;
}

export const IssueDialog = ({
  mode,
  handleClose,
  handleSubmitting,
  initialSprintId,
  issueId,
  parentId,
  targetStatus
}: Props) => {
  const [initialData, setInitialData] = React.useState<IssueData>({
    id: null,
    title: '',
    description: '',
    estimateStoryPoints: '',
    estimateHours: '',
    pullRequestUrl: '',
    assigneeId: null,
    sprintId: typeof initialSprintId !== 'undefined' ? initialSprintId : null,
    status: ISSUE_STATUS.TO_DO,
    type: mode === ISSUE_DIALOG_MODES.ADD_SUBTASK ? ISSUE_TYPE.SUBTASK : ISSUE_TYPE.TASK,
    priority: ISSUE_PRIORITY.MEDIUM,
    parentId: parentId ? parentId : null
  });

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const notCompletedSprints = useSelector(
    (state: ApplicationState) => (state.project ? state.project.notCompletedSprints : []),
    shallowEqual
  );
  const organisationMembers = useSelector(
    (state: ApplicationState) => (state.organisation ? state.organisation.organisationMembers : []),
    shallowEqual
  );
  const currentProject = CurrentProjectModel.currentProjectValue;

  React.useEffect(() => {
    dispatch(actionCreators.getOrganisationMembers(currentProject.organisationId));
  }, [currentProject.organisationId, dispatch]);

  React.useEffect(() => {
    if (issueId && issueId !== initialData.id && mode === ISSUE_DIALOG_MODES.EDIT) {
      Api.get(`issues/${issueId}`)
        .then((response: ApiResponse) => response.json())
        .then((data: IssueData) => {
          const dataWithRemovedNullValues: IssueData = convertNullFieldsToEmptyString(
            data
          ) as IssueData;
          const adjustedData = targetStatus
            ? { ...dataWithRemovedNullValues, status: targetStatus, sprintId: data.sprintId }
            : { ...dataWithRemovedNullValues, sprintId: data.sprintId };

          setInitialData({ ...adjustedData });
        });
    }
  }, [issueId, initialData.id, mode, targetStatus]);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, t('issueDialog.validation.title.minLength'))
      .max(50, t('issueDialog.validation.title.maxLength'))
      .required(t('issueDialog.validation.title.required')),
    description: Yup.string().required(t('issueDialog.validation.description.required')),
    assigneeId: Yup.string().nullable(),
    sprintId: Yup.string().nullable(),
    estimateStoryPoints: Yup.string().nullable(),
    estimateHours: Yup.string().nullable(),
    status: Yup.mixed<ISSUE_STATUS>().oneOf(Object.values(ISSUE_STATUS)),
    priority: Yup.string(),
    pullRequestUrl: Yup.string().when('status', {
      is: 'CODE_REVIEW',
      then: Yup.string()
        .min(10, t('issueDialog.validation.pullRequestUrl.minLength'))
        .max(150, t('issueDialog.validation.pullRequestUrl.maxLength'))
        .required(t('issueDialog.validation.pullRequestUrl.required'))
    })
  });

  const onCancel = (e: React.MouseEvent): void => {
    e.preventDefault();
    handleClose();
  };

  const onSubmit = async (values: IssueData): Promise<void> => {
    let result: Response;

    if (!issueId && [ISSUE_DIALOG_MODES.ADD, ISSUE_DIALOG_MODES.ADD_SUBTASK].includes(mode)) {
      result = await Api.post('issues', {
        ...values,
        projectId: currentProject.id
      });
    } else {
      result = await Api.put(`issues/${issueId}`, { ...values });
    }

    if ([201, 204].includes(result.status)) {
      handleSubmitting();
    }
  };

  const handleEstimateChangeFactory =
    (
      fieldName: 'estimateStoryPoints' | 'estimateHours',
      changeCb: (field: string, value: Unrestricted, shouldValidate?: boolean) => void
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();

      if (e.target.validity.valid) {
        changeCb(fieldName, e.target.value);
      }
    };

  const renderAssigneeField = (assigneeId: Nullable<Id>): JSX.Element => {
    const selectedAssignee = organisationMembers.find((member) => member.id === assigneeId);

    return (
      <StyledAssigneeField>
        <UserCircle imageSrc={selectedAssignee?.avatar} />
        <StyledAssigneeLabel>
          {selectedAssignee
            ? `${selectedAssignee.firstName} ${selectedAssignee.lastName}`
            : t('general.unassigned')}
        </StyledAssigneeLabel>
      </StyledAssigneeField>
    );
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
      {({
        errors,
        touched,
        handleSubmit,
        isValid,
        initialValues,
        setFieldValue,
        values
      }: FormikProps<IssueData>) => (
        <Form name="issue" method="POST" onSubmit={handleSubmit}>
          <ModalDialog
            header={t(`issueDialog.header.${mode.toLowerCase()}`)}
            footer={renderFooter(!isValid)}
          >
            <StyledDialogContent>
              <FormField label={t('issueDialog.title')} name="title" required>
                <TextInput
                  valid={!errors.title && touched.title}
                  error={errors.title && touched.title}
                  name="title"
                  type="text"
                />
              </FormField>
              <StyledFlexContainerSpaceBetween>
                <FormField label={t('issueDialog.type')} name="type">
                  <SingleSelectDropdown
                    disabled={mode === ISSUE_DIALOG_MODES.ADD_SUBTASK}
                    options={mapIssueTypesToDropdownOptions(mode)}
                    value={values.type}
                    onChange={(value: Nullable<string>) => setFieldValue('type', value)}
                  />
                </FormField>
                <FormField label={t('issueDialog.priority')} name="priority">
                  <SingleSelectDropdown
                    options={mapIssuePrioritiesToDropdownOptions(t)}
                    value={values.priority}
                    onChange={(value: Nullable<string>) => setFieldValue('priority', value)}
                  />
                </FormField>
              </StyledFlexContainerSpaceBetween>
              <FormField alignItems="center" label={t('issueDialog.assignee')} name="assignee">
                {renderAssigneeField(values.assigneeId)}
                <DropdownWithSearch
                  onChange={(value: Nullable<Id>) => setFieldValue('assigneeId', value)}
                  options={mapUsersToDropdownOptions(organisationMembers)}
                  position={DROPDOWN_MENU_POSITION.BOTTOM_LEFT}
                />
              </FormField>
              {currentProject.methodology === PROJECT_METHODOLOGIES.AGILE && (
                <FormField label={t('issueDialog.estimateStoryPoints')} name="estimateStoryPoints">
                  <TextInput
                    disabled={
                      values.type === ISSUE_TYPE.SUBTASK || mode === ISSUE_DIALOG_MODES.ADD_SUBTASK
                    }
                    valid={!errors.estimateStoryPoints && touched.estimateStoryPoints}
                    error={errors.estimateStoryPoints && touched.estimateStoryPoints}
                    name="estimateStoryPoints"
                    type="text"
                    pattern="[0-9]*"
                    onChange={handleEstimateChangeFactory('estimateStoryPoints', setFieldValue)}
                  />
                </FormField>
              )}
              <FormField label={t('issueDialog.estimateHours')} name="estimateHours">
                <TextInput
                  valid={!errors.estimateHours && touched.estimateHours}
                  error={errors.estimateHours && touched.estimateHours}
                  name="estimateHours"
                  pattern="[0-9]*"
                  type="text"
                  onChange={handleEstimateChangeFactory('estimateHours', setFieldValue)}
                />
              </FormField>
              <FormField
                label={t('issueDialog.pullRequestUrl')}
                name="pullRequestUrl"
                required={values.status === ISSUE_STATUS.CODE_REVIEW}
              >
                <TextInput
                  valid={!errors.pullRequestUrl && touched.pullRequestUrl}
                  error={errors.pullRequestUrl && touched.pullRequestUrl}
                  name="pullRequestUrl"
                  type="text"
                />
              </FormField>
              {currentProject.methodology === PROJECT_METHODOLOGIES.AGILE && (
                <FormField label={t('issueDialog.sprint')} name="sprintId">
                  <SingleSelectDropdown
                    options={mapSprintsToDropdownOptions(notCompletedSprints)}
                    value={values.sprintId}
                    onChange={(value: Nullable<Id>) => setFieldValue('sprintId', value)}
                  />
                </FormField>
              )}
              <FormField label={t('issueDialog.description')} name="description" required>
                <WysiwygEditor
                  onChange={(value: string) => {
                    setFieldValue('description', value);
                  }}
                  initialValue={initialValues.description}
                />
              </FormField>
            </StyledDialogContent>
          </ModalDialog>
        </Form>
      )}
    </Formik>
  );
};
