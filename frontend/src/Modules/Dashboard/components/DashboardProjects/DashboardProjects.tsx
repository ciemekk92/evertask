import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { IconButton } from 'Shared/Elements/Buttons';
import { StyledLink } from 'Shared/StyledLink';
import { UserModel } from 'Models/UserModel';
import { PermissionCheck } from 'Utils/PermissionCheck';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { ProjectDialog } from 'Modules/ProjectDialog/ProjectDialog';
import { PROJECT_DIALOG_MODES } from 'Modules/ProjectDialog/fixtures';
import { Project } from 'Types/Project';
import { StyledHeaderRow, StyledSectionWrapper } from '../../Dashboard.styled';
import { StyledProjectPanel } from './DashboardProjects.styled';

interface Props {
  data: Project[];
}

export const DashboardProjects = ({ data }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { isOpen, dialogMode, handleOpen, handleClose } = useDialog<PROJECT_DIALOG_MODES>(
    PROJECT_DIALOG_MODES.ADD
  );

  const isUserProjectAdmin = UserModel.currentUserValue.authorities.some(
    PermissionCheck.isProjectAdmin
  );

  const renderUpdatedAtDate = (updatedAt?: string) => {
    if (updatedAt) {
      return (
        <p>
          {t('dashboard.projects.updatedAt')}: {new Date(updatedAt).toLocaleString()}
        </p>
      );
    }

    return t('dashboard.projects.notUpdated');
  };

  const renderProjectPanels = () => {
    return data.map((project: Project) => (
      <StyledLink key={project.id} to={`project/${project.id}`}>
        <StyledProjectPanel>
          <p>{project.name}</p>
          {renderUpdatedAtDate(project.lastUpdatedAt)}
        </StyledProjectPanel>
      </StyledLink>
    ));
  };

  const handleOpeningAddProject = () => {
    handleOpen(PROJECT_DIALOG_MODES.ADD);
  };

  return (
    <StyledSectionWrapper>
      <StyledHeaderRow>
        <Heading6>{t('dashboard.projects.title')}</Heading6>
        {isUserProjectAdmin && (
          <IconButton iconName="add" onClick={handleOpeningAddProject}>
            {t('dashboard.projects.add')}
          </IconButton>
        )}
      </StyledHeaderRow>
      {renderProjectPanels()}
      <DialogComponent isOpen={isOpen} handleClose={handleClose}>
        <ProjectDialog mode={dialogMode} handleClose={handleClose} />
      </DialogComponent>
    </StyledSectionWrapper>
  );
};
