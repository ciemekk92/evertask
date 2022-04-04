import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { IconButton } from 'Shared/Elements/Buttons';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { ProjectDialog } from 'Modules/ProjectDialog/ProjectDialog';
import { PROJECT_DIALOG_MODES } from 'Modules/ProjectDialog/fixtures';
import { Project } from 'Types/Project';
import { StyledSectionRow, StyledSectionWrapper } from '../../Dashboard.styled';
import { StyledProjectPanel } from './DashboardProjects.styled';

interface Props {
  data: Project[];
}

export const DashboardProjects = ({ data }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { isOpen, dialogMode, handleOpen, handleClose } = useDialog<PROJECT_DIALOG_MODES>(
    PROJECT_DIALOG_MODES.ADD
  );

  const renderProjectPanels = () => {
    return data.map((project: Project) => (
      <StyledProjectPanel key={project.id}>{project.name}</StyledProjectPanel>
    ));
  };

  const handleOpeningAddProject = () => {
    handleOpen(PROJECT_DIALOG_MODES.ADD);
  };

  return (
    <StyledSectionWrapper>
      <StyledSectionRow>
        <Heading6>{t('dashboard.projects.title')}</Heading6>
        <IconButton iconName="add" onClick={handleOpeningAddProject}>
          {t('dashboard.projects.add')}
        </IconButton>
      </StyledSectionRow>
      {renderProjectPanels()}
      <DialogComponent isOpen={isOpen} handleClose={handleClose}>
        <ProjectDialog mode={dialogMode} handleClose={handleClose} />
      </DialogComponent>
    </StyledSectionWrapper>
  );
};
