import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { IconButton } from 'Shared/Elements/Buttons';
import { Project } from 'Types/Project';
import { StyledSectionRow, StyledSectionWrapper } from '../../Dashboard.styled';
import { StyledProjectPanel } from './DashboardProjects.styled';

interface Props {
  data: Project[];
}

export const DashboardProjects = ({ data }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderProjectPanels = () => {
    return data.map((project: Project) => (
      <StyledProjectPanel key={project.id}>{project.name}</StyledProjectPanel>
    ));
  };

  return (
    <StyledSectionWrapper>
      <StyledSectionRow>
        <Heading6>{t('dashboard.projects.title')}</Heading6>
        <IconButton iconName="add">{t('dashboard.projects.add')}</IconButton>
      </StyledSectionRow>
      {renderProjectPanels()}
    </StyledSectionWrapper>
  );
};
