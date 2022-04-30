import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { IconButton } from 'Shared/Elements/Buttons';
import { Project } from 'Types/Project';
import { StyledWrapper, StyledHeaderRow } from '../../OrganisationPage.styled';
import { StyledProjectPanel } from './ProjectsSection.styled';

interface Props {
  projectsData: Project[];
  handleOpeningAddProject: VoidFunctionNoArgs;
}

export const ProjectsSection = ({ projectsData, handleOpeningAddProject }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderProjects = (): JSX.Element[] | JSX.Element => {
    if (projectsData.length) {
      return projectsData.map((project: Project) => (
        <StyledProjectPanel key={project.id}>{project.name}</StyledProjectPanel>
      ));
    }

    return <p>{t('organisationPage.noProjects')}</p>;
  };

  return (
    <StyledWrapper>
      <StyledHeaderRow>
        <Heading6>{t('organisationPage.projects')}</Heading6>
        <IconButton iconName="add" onClick={handleOpeningAddProject}>
          {t('organisationPage.addProject')}
        </IconButton>
      </StyledHeaderRow>
      {renderProjects()}
    </StyledWrapper>
  );
};
