import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { IconButton } from 'Shared/Elements/Buttons';
import { ProjectPanel } from 'Shared/ProjectPanel';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { PermissionCheck } from 'Utils/PermissionCheck';
import { Project } from 'Types/Project';

interface Props {
  projectsData: Project.ProjectEntity[];
  handleOpeningAddProject: VoidFunctionNoArgs;
}

export const ProjectsSection = ({ projectsData, handleOpeningAddProject }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderProjects = (): JSX.Element[] | JSX.Element => {
    if (projectsData.length) {
      return projectsData.map((project: Project.ProjectEntity) => (
        <ProjectPanel key={project.id} project={project} />
      ));
    }

    return <p>{t('organisationPage.noProjects')}</p>;
  };

  const renderAddProjectButton = (): Nullable<JSX.Element> => {
    if (PermissionCheck.isAssignedUser) {
      return (
        <IconButton iconName="add" onClick={handleOpeningAddProject}>
          {t('organisationPage.addProject')}
        </IconButton>
      );
    }

    return null;
  };

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('organisationPage.projects')}</Heading6>
        {renderAddProjectButton()}
      </StyledSectionHeaderRow>
      {renderProjects()}
    </StyledSectionWrapper>
  );
};
