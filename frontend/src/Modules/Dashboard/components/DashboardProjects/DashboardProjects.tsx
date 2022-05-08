import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { ProjectPanel } from 'Shared/ProjectPanel';
import { Project } from 'Types/Project';
import { StyledHeaderRow, StyledSectionWrapper } from '../../Dashboard.styled';

interface Props {
  data: Project.ProjectEntity[];
}

export const DashboardProjects = ({ data }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderProjectPanels = () => {
    return data.map((project: Project.ProjectEntity) => (
      <ProjectPanel key={project.id} project={project} />
    ));
  };

  return (
    <StyledSectionWrapper>
      <StyledHeaderRow>
        <Heading6>{t('dashboard.projects.title')}</Heading6>
      </StyledHeaderRow>
      {renderProjectPanels()}
    </StyledSectionWrapper>
  );
};
