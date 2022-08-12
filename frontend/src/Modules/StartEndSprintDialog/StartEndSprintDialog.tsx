import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Formik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { Form, FormField } from 'Shared/Elements/Form';
import { ModalDialog } from 'Shared/ModalDialog';
import { FormikDateInput } from 'Shared/Elements/DateInput';
import { SingleSelectDropdown } from 'Shared/Elements/SingleSelectDropdown';
import { ApplicationState } from 'Stores/store';
import { Sprint } from 'Types/Sprint';
import { Api } from 'Utils/Api';
import { formatDateForInput } from 'Utils/formatDate';
import { START_END_SPRINT_DIALOG_MODES } from './fixtures';
import { getValidationSchema } from './helpers';
import { StyledDialogContent } from './StartEndSprintDialog.styled';

interface Props {
  mode: START_END_SPRINT_DIALOG_MODES;
  handleClose: VoidFunctionNoArgs;
  handleSubmitting: VoidFunctionNoArgs;
  sprintId: Id;
  projectId: Id;
  sprintData: Partial<FormData>;
}

interface FormData {
  startDate: string;
  finishDate: string;
  sprintIdToMoveTo: Nullable<Id>;
}

export const StartEndSprintDialog = ({
  mode,
  handleClose,
  handleSubmitting,
  sprintId,
  projectId,
  sprintData
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const notCompletedSprints = useSelector(
    (state: ApplicationState) => (state.project ? state.project.notCompletedSprints : []),
    shallowEqual
  );

  const validationSchema = React.useCallback(() => getValidationSchema(mode, t), [mode, t]);

  const initialData: FormData = {
    startDate: sprintData.startDate ? formatDateForInput(sprintData.startDate) : '',
    finishDate: sprintData.finishDate ? formatDateForInput(sprintData.finishDate) : '',
    sprintIdToMoveTo: null
  };

  const mapSprintsToDropdownOptions = (sprints: Sprint.SprintIssuesEntity[]): DropdownOption[] => {
    const noSprintSelectedOption = {
      value: null,
      label: t('general.backlog')
    };

    const mappedSprints = sprints
      .filter((sprint: Sprint.SprintIssuesEntity) => sprint.id !== sprintId)
      .map((sprint: Sprint.SprintIssuesEntity) => ({
        value: sprint.id,
        label: `Sprint ${sprint.ordinal}`
      }));

    return [noSprintSelectedOption, ...mappedSprints];
  };

  const onCancel = (e: React.MouseEvent): void => {
    e.preventDefault();
    handleClose();
  };

  const onSubmit = async (values: FormData): Promise<void> => {
    const adjustedValues = {
      finishDate: values.finishDate,
      sprintId,
      ...(mode === START_END_SPRINT_DIALOG_MODES.START
        ? { startDate: values.startDate }
        : { sprintIdToMoveTo: values.sprintIdToMoveTo })
    };

    const result = await Api.put(
      `projects/${projectId}/${
        mode === START_END_SPRINT_DIALOG_MODES.START ? 'start_sprint' : 'end_sprint'
      }`,
      adjustedValues
    );

    if (result.status === 204) {
      handleSubmitting();
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
      {({ handleSubmit, isValid, values, setFieldValue }: FormikProps<FormData>) => (
        <Form name="sprint" method="POST" onSubmit={handleSubmit}>
          <ModalDialog
            header={t(`startEndSprintDialog.title.${mode.toLowerCase()}`)}
            footer={renderFooter(!isValid)}
          >
            <StyledDialogContent>
              {mode === START_END_SPRINT_DIALOG_MODES.START && (
                <FormField label={t('sprintDialog.startDate')} name="startDate">
                  <FormikDateInput name="startDate" />
                </FormField>
              )}
              <FormField label={t('sprintDialog.finishDate')} name="finishDate">
                <FormikDateInput name="finishDate" />
              </FormField>
              {mode === START_END_SPRINT_DIALOG_MODES.END && (
                <FormField
                  label={t('startEndSprintDialog.sprintIdToMoveTo')}
                  name="sprintIdToMoveTo"
                >
                  <SingleSelectDropdown
                    options={mapSprintsToDropdownOptions(notCompletedSprints)}
                    value={values.sprintIdToMoveTo}
                    onChange={(value: Nullable<Id>) => setFieldValue('sprintIdToMoveTo', value)}
                  />
                </FormField>
              )}
            </StyledDialogContent>
          </ModalDialog>
        </Form>
      )}
    </Formik>
  );
};
