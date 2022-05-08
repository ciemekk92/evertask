import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SingleSelectDropdown } from 'Shared/Elements/SingleSelectDropdown';
import { StyledFieldContainer, StyledLabel } from './CurrentProjectField.styled';
import { ApplicationState } from 'Stores/store';
import { Project } from 'Types/Project';
import { CurrentProjectModel } from '../../Models/CurrentProjectModel';

export const CurrentProjectField = () => {
  const [currentProjectValue, setCurrentProjectValue] = React.useState<Id>('');
  const { t } = useTranslation();
  const organisationProjects = useSelector((state: ApplicationState) =>
    state.project ? state.project.organisationProjects : []
  );

  React.useEffect(() => {
    CurrentProjectModel.currentProject.subscribe((project: Project.ProjectEntity) => {
      setCurrentProjectValue(project.id);
    });
  }, [CurrentProjectModel.currentProject]);

  const handleSelectingCurrentProject = (value: string) => {};

  const mappedProjects = organisationProjects.map((project: Project.ProjectEntity) => ({
    value: project.id,
    label: project.name
  }));

  return (
    <StyledFieldContainer>
      <StyledLabel>{t('header.currentProject')}</StyledLabel>
      <SingleSelectDropdown
        options={mappedProjects}
        value={currentProjectValue}
        onChange={handleSelectingCurrentProject}
      />
    </StyledFieldContainer>
  );
};
