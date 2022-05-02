import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { IconButton } from 'Shared/Elements/Buttons';
import { PermissionCheck } from 'Utils/PermissionCheck';
import { Project } from 'Types/Project';
import { UserModel } from 'Models/UserModel';
import { StyledWrapper, StyledHeaderRow } from '../../OrganisationPage.styled';
import { StyledProjectPanel } from './ProjectsSection.styled';

interface Props {
  projectsData: Project.ProjectEntity[];
  handleOpeningAddProject: VoidFunctionNoArgs;
}

export const ProjectsSection = ({ projectsData, handleOpeningAddProject }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderProjects = (): JSX.Element[] | JSX.Element => {
    if (projectsData.length) {
      return projectsData.map((project: Project.ProjectEntity) => (
        <StyledProjectPanel key={project.id}>{project.name}</StyledProjectPanel>
      ));
    }

    return <p>{t('organisationPage.noProjects')}</p>;
  };

  const currentUser = UserModel.currentUserValue;

  const renderAddProjectButton = (): Nullable<JSX.Element> => {
    if (currentUser.authorities.some((role) => PermissionCheck.isOrganisationAdmin(role))) {
      return (
        <IconButton iconName="add" onClick={handleOpeningAddProject}>
          {t('organisationPage.addProject')}
        </IconButton>
      );
    }

    return null;
  };

  return (
    <StyledWrapper>
      <StyledHeaderRow>
        <Heading6>{t('organisationPage.projects')}</Heading6>
        {renderAddProjectButton()}
      </StyledHeaderRow>
      {renderProjects()}
    </StyledWrapper>
  );
};
