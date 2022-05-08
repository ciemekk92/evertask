import React from 'react';
import { useTranslation } from 'react-i18next';
import { Project } from 'Types/Project';
import { MethodologyBadge } from '../MethodologyBadge';
import { StyledLink } from '../StyledLink';
import { StyledProjectName, StyledProjectPanel } from './ProjectPanel.styled';

interface Props {
  project: Project.ProjectEntity;
}

export const ProjectPanel = ({ project }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderUpdatedAtDate = (updatedAt?: string) => {
    if (updatedAt) {
      return (
        <p>
          {t('general.updatedAt')}: {new Date(updatedAt).toLocaleString()}
        </p>
      );
    }

    return <p>{t('general.notUpdated')}</p>;
  };

  return (
    <StyledLink to={`/project/${project.id}`}>
      <StyledProjectPanel>
        <MethodologyBadge label={project.methodology} />
        <StyledProjectName>{project.name}</StyledProjectName>
        {renderUpdatedAtDate(project.lastUpdatedAt)}
      </StyledProjectPanel>
    </StyledLink>
  );
};
