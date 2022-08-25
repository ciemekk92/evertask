import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { START_END_SPRINT_DIALOG_MODES, StartEndSprintDialog } from 'Modules/StartEndSprintDialog';
import { IconButton } from 'Shared/Elements/Buttons';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { SprintPanel } from 'Shared/SprintPanel';
import { Heading6 } from 'Shared/Typography';
import { Sprint } from 'Types/Sprint';
import { PermissionCheck } from 'Utils/PermissionCheck';

interface Props {
  sprintsData: Sprint.SprintEntity[];
  handleOpeningAddSprint: VoidFunctionNoArgs;
  handleOpeningEditSprint: (id: Id) => VoidFunctionNoArgs;
  projectId: Id;
  activeSprintId?: Id;
  handleRefreshingProjectState: (id: Id) => void;
}

export const ProjectSprintsSection = ({
  sprintsData,
  handleOpeningAddSprint,
  handleOpeningEditSprint,
  projectId,
  activeSprintId,
  handleRefreshingProjectState
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const startEndSprintDialogConfig = useDialog<START_END_SPRINT_DIALOG_MODES>(
    START_END_SPRINT_DIALOG_MODES.START
  );

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
        handleRefreshingProjectState(projectId);
      }
    };

  const canSprintBeStarted = (ordinal: number): boolean => {
    if (activeSprintId) {
      return false;
    }

    const currentActiveSprint = sprintsData.find(
      (sprint: Sprint.SprintEntity) => sprint.id === activeSprintId
    );

    if (!currentActiveSprint) {
      const firstNotCompletedSprint = sprintsData.find(
        (sprint: Sprint.SprintEntity) => !sprint.completed
      );

      if (firstNotCompletedSprint) {
        return firstNotCompletedSprint.ordinal === ordinal;
      }
    } else {
      const nextPossibleActiveSprint = sprintsData.find(
        (sprint: Sprint.SprintEntity) => sprint.ordinal === currentActiveSprint.ordinal + 1
      );

      if (nextPossibleActiveSprint) {
        return nextPossibleActiveSprint.ordinal === ordinal;
      }
    }

    return false;
  };

  const renderSprintPanels = (): JSX.Element | JSX.Element[] => {
    if (!sprintsData.length) {
      return <p>{t('projectPage.noSprints')}</p>;
    }

    return sprintsData.map((sprint: Sprint.SprintEntity) => (
      <SprintPanel
        key={sprint.id}
        sprint={sprint}
        isActive={sprint.id === activeSprintId}
        canBeStarted={canSprintBeStarted(sprint.ordinal)}
        handleOpeningEditSprint={handleOpeningEditSprint}
        handleOpeningStartEndSprintDialog={handleOpeningStartEndSprintDialog(sprint)}
      />
    ));
  };

  const renderAddSprintButton = (): Nullable<JSX.Element> => {
    if (PermissionCheck.isProjectAdmin) {
      return (
        <IconButton iconName="add" onClick={handleOpeningAddSprint}>
          {t('general.addSprint')}
        </IconButton>
      );
    }

    return null;
  };

  return (
    <React.Fragment>
      <StyledSectionWrapper>
        <StyledSectionHeaderRow>
          <Heading6>{t('projectPage.sprints')}</Heading6>
          {renderAddSprintButton()}
        </StyledSectionHeaderRow>
        {renderSprintPanels()}
      </StyledSectionWrapper>
      <DialogComponent
        isOpen={startEndSprintDialogConfig.isOpen}
        handleClose={startEndSprintDialogConfig.handleClose}
      >
        <StartEndSprintDialog
          mode={startEndSprintDialogConfig.dialogMode}
          handleClose={startEndSprintDialogConfig.handleClose}
          handleSubmitting={startEndSprintDialogConfig.handleSubmit}
          projectId={projectId}
          sprintId={startEndSprintDialogConfig.params.sprintId}
          sprintData={startEndSprintDialogConfig.params.sprintData}
        />
      </DialogComponent>
    </React.Fragment>
  );
};
