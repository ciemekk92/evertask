import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { Project } from 'Types/Project';
import { StyledWrapper, StyledHeaderRow } from '../../OrganisationPage.styled';
import { StyledProjectPanel } from './ProjectsSection.styled';

interface Props {
  projectsData: Project[];
}

export const ProjectsSection = ({ projectsData }: Props): JSX.Element => {
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
      </StyledHeaderRow>
      {renderProjects()}
    </StyledWrapper>
  );
};
