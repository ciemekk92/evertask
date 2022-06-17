import React from 'react';
import { useTranslation } from 'react-i18next';
import { PermissionCheck } from 'Utils/PermissionCheck';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { CONFIRMATION_DIALOG_MODES, ConfirmationDialog } from 'Shared/ConfirmationDialog';
import { IconButton } from 'Shared/Elements/Buttons';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { ProjectSprintPanel } from '..';

interface Props {
  sprintsData: Sprint.SprintEntity[];
  handleOpeningAddSprint: VoidFunctionNoArgs;
  handleOpeningEditSprint: VoidFunctionNoArgs;
  activeSprintId?: Id;
}

export const ProjectSprintsSection = ({
  sprintsData,
  handleOpeningAddSprint,
  handleOpeningEditSprint,
  activeSprintId
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const confirmationDialogConfig = useDialog<CONFIRMATION_DIALOG_MODES>(
    CONFIRMATION_DIALOG_MODES.CONFIRM
  );

  const handleOpeningActivationConfirmationFactory = (id: string) => () => {
    confirmationDialogConfig.handleOpen(CONFIRMATION_DIALOG_MODES.CONFIRM, { sprintId: id });
  };

  const renderSprintPanels = (): JSX.Element | JSX.Element[] => {
    if (!sprintsData.length) {
      return <p>{t('projectPage.noSprints')}</p>;
    }

    return sprintsData.map((sprint: Sprint.SprintEntity) => (
      <ProjectSprintPanel
        key={sprint.id}
        sprint={sprint}
        isActive={sprint.id === activeSprintId}
        handleOpeningEditSprint={handleOpeningEditSprint}
        handleOpeningActivationConfirmation={handleOpeningActivationConfirmationFactory(sprint.id)}
      />
    ));
  };

  const renderAddSprintButton = (): Nullable<JSX.Element> => {
    if (PermissionCheck.isProjectAdmin) {
      return (
        <IconButton iconName="add" onClick={handleOpeningAddSprint}>
          {t('projectPage.addSprint')}
        </IconButton>
      );
    }

    return null;
  };

  // TODO - HERE NEXT
  const handleActivatingSprint = () => {};

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
        isOpen={confirmationDialogConfig.isOpen}
        handleClose={confirmationDialogConfig.handleClose}
      >
        <ConfirmationDialog
          message={t('')}
          handleClose={confirmationDialogConfig.handleClose}
          handleConfirm={handleActivatingSprint}
        />
      </DialogComponent>
    </React.Fragment>
  );
};
