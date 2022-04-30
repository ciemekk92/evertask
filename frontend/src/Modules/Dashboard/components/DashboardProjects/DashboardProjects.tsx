import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { StyledLink } from 'Shared/StyledLink';
import { Project } from 'Types/Project';
import { StyledHeaderRow, StyledSectionWrapper } from '../../Dashboard.styled';
import { StyledProjectPanel } from './DashboardProjects.styled';

interface Props {
  data: Project[];
}

export const DashboardProjects = ({ data }: Props): JSX.Element => {
  const { t } = useTranslation();

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

  return (
    <StyledSectionWrapper>
      <StyledHeaderRow>
        <Heading6>{t('dashboard.projects.title')}</Heading6>
      </StyledHeaderRow>
      {renderProjectPanels()}
    </StyledSectionWrapper>
  );
};
