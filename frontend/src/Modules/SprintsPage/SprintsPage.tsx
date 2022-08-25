import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { IconButton } from 'Shared/Elements/Buttons';
import {
  StyledSectionHeaderRow,
  StyledSectionWrapper,
  VerticalPageWrapper
} from 'Shared/PageWrappers';
import { SprintPanel } from 'Shared/SprintPanel';
import { Heading5, Heading6 } from 'Shared/Typography';
import { actionCreators } from 'Stores/Project';
import { ApplicationState } from 'Stores/store';
import { Sprint } from 'Types/Sprint';
import { START_END_SPRINT_DIALOG_MODES, StartEndSprintDialog } from '../StartEndSprintDialog';
import { SPRINT_DIALOG_MODES, SprintDialog } from '../SprintDialog';
import { StyledHeadingContainer } from './SprintsPage.styled';

export const SprintsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const sprintDialogConfig = useDialog<SPRINT_DIALOG_MODES>(SPRINT_DIALOG_MODES.ADD);
  const startEndSprintDialogConfig = useDialog<START_END_SPRINT_DIALOG_MODES>(
    START_END_SPRINT_DIALOG_MODES.START
  );

  const currentProject = CurrentProjectModel.currentProjectValue;

  const handleRefreshingSprints = React.useCallback(async () => {
    await CurrentProjectModel.refreshCurrentProject();
    if (currentProject.id) {
      dispatch(actionCreators.getCompletedSprints(currentProject.id));
      dispatch(actionCreators.getNotCompletedSprints(currentProject.id));
    }
  }, [currentProject.id, dispatch]);

  React.useEffect(() => {
    if (currentProject.id) {
      handleRefreshingSprints();
    }
  }, [handleRefreshingSprints, currentProject.id]);

  const completedSprints = useSelector(
    (state: ApplicationState) => (state.project ? state.project.completedSprints : []),
    shallowEqual
  );

  const notCompletedSprints = useSelector(
    (state: ApplicationState) => (state.project ? state.project.notCompletedSprints : []),
    shallowEqual
  );

  const canSprintBeStarted = (ordinal: number): boolean => {
    if (currentProject.activeSprint) {
      return false;
    }

    const firstNotCompletedSprint = notCompletedSprints.find(
      (sprint: Sprint.SprintEntity) => !sprint.completed
    );

    if (firstNotCompletedSprint) {
      return firstNotCompletedSprint.ordinal === ordinal;
    }

    return false;
  };

  const handleOpeningAddSprint = async (): Promise<void> => {
    const result = await sprintDialogConfig.handleOpen(SPRINT_DIALOG_MODES.ADD);

    if (result) {
      await handleRefreshingSprints();
    }
  };

  const handleOpeningEditSprint = (id: Id) => async (): Promise<void> => {
    const result = await sprintDialogConfig.handleOpen(SPRINT_DIALOG_MODES.EDIT, { sprintId: id });

    if (result) {
      await handleRefreshingSprints();
    }
  };

  const handleOpeningStartEndSprintDialog =
    (sprint: Sprint.SprintEntity) =>
    async (mode: START_END_SPRINT_DIALOG_MODES): Promise<void> => {
      const dialogResult = await startEndSprintDialogConfig.handleOpen(mode, {
        sprintId: sprint.id,
        sprintData: {
          startDate: sprint.startDate,
          finishDate: sprint.finishDate
        }
      });

      if (!dialogResult) {
        return;
      } else {
        await handleRefreshingSprints();
      }
    };

  const renderCurrentSprint = (): Nullable<JSX.Element> =>
    currentProject.activeSprint && (
      <StyledSectionWrapper>
        <StyledSectionHeaderRow>
          <Heading6>{t('sprintsPage.currentSprint')}</Heading6>
        </StyledSectionHeaderRow>
        <SprintPanel
          sprint={currentProject.activeSprint}
          isActive
          canBeStarted={false}
          handleOpeningEditSprint={handleOpeningEditSprint}
          handleOpeningStartEndSprintDialog={handleOpeningStartEndSprintDialog(
            currentProject.activeSprint
          )}
        />
      </StyledSectionWrapper>
    );

  const renderFutureSprints = (): JSX.Element => (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('sprintsPage.notCompletedSprints')}</Heading6>
        <IconButton iconName="add" onClick={handleOpeningAddSprint}>
          {t('general.addSprint')}
        </IconButton>
      </StyledSectionHeaderRow>
      {notCompletedSprints
        .filter((el: Sprint.SprintEntity) => {
          if (currentProject.activeSprint) {
            return el.id !== currentProject.activeSprint.id;
          }
          return true;
        })
        .map((sprint: Sprint.SprintEntity) => (
          <SprintPanel
            key={sprint.id}
            sprint={sprint}
            isActive={false}
            canBeStarted={canSprintBeStarted(sprint.ordinal)}
            handleOpeningEditSprint={handleOpeningEditSprint}
            handleOpeningStartEndSprintDialog={handleOpeningStartEndSprintDialog(sprint)}
          />
        ))}
    </StyledSectionWrapper>
  );

  const renderPastSprints = (): JSX.Element => (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('sprintsPage.completedSprints')}</Heading6>
      </StyledSectionHeaderRow>
      {completedSprints.map((sprint: Sprint.SprintEntity) => (
        <SprintPanel
          key={sprint.id}
          sprint={sprint}
          isActive={false}
          canBeStarted={false}
          handleOpeningEditSprint={handleOpeningEditSprint}
          handleOpeningStartEndSprintDialog={handleOpeningStartEndSprintDialog(sprint)}
        />
      ))}
    </StyledSectionWrapper>
  );

  const renderDialogs = React.useCallback(
    (): JSX.Element => (
      <React.Fragment>
        <DialogComponent
          isOpen={startEndSprintDialogConfig.isOpen}
          handleClose={startEndSprintDialogConfig.handleClose}
        >
          <StartEndSprintDialog
            mode={startEndSprintDialogConfig.dialogMode}
            handleClose={startEndSprintDialogConfig.handleClose}
            handleSubmitting={startEndSprintDialogConfig.handleSubmit}
            projectId={currentProject.id}
            sprintId={startEndSprintDialogConfig.params.sprintId}
            sprintData={startEndSprintDialogConfig.params.sprintData}
          />
        </DialogComponent>
        <DialogComponent
          isOpen={sprintDialogConfig.isOpen}
          handleClose={sprintDialogConfig.handleClose}
        >
          <SprintDialog
            mode={sprintDialogConfig.dialogMode}
            handleClose={sprintDialogConfig.handleClose}
            handleSubmitting={sprintDialogConfig.handleSubmit}
            projectId={currentProject.id}
            sprintId={sprintDialogConfig.params.sprintId}
          />
        </DialogComponent>
      </React.Fragment>
    ),
    [currentProject.id, sprintDialogConfig, startEndSprintDialogConfig]
  );

  return (
    <VerticalPageWrapper alignItems="unset">
      <StyledHeadingContainer>
        <Heading5>{t('sprintsPage.title')}</Heading5>
      </StyledHeadingContainer>
      {renderCurrentSprint()}
      {renderFutureSprints()}
      {renderPastSprints()}
      {renderDialogs()}
    </VerticalPageWrapper>
  );
};
