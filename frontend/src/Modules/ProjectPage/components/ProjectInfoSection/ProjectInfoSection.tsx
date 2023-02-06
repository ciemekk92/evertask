import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from 'Shared/Elements/Buttons';
import { InfoField } from 'Shared/Elements/InfoField';
import { MethodologyBadge } from 'Shared/MethodologyBadge';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { Project } from 'Types/Project';
import { PermissionCheck } from 'Utils/PermissionCheck';

interface Props {
  project: Project.ProjectEntity;
  handleOpeningEditProject: () => Promise<void>;
}

export const ProjectInfoSection = ({ project, handleOpeningEditProject }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderEditProjectInfoButton = (): Nullable<JSX.Element> => {
    if (PermissionCheck.isCurrentProjectAdmin) {
      return (
        <IconButton iconName="edit" onClick={handleOpeningEditProject}>
          {t('general.edit')}
        </IconButton>
      );
    }

    return null;
  };

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('projectPage.infoTitle')}</Heading6>
        {renderEditProjectInfoButton()}
      </StyledSectionHeaderRow>
      <InfoField label={t('projectPage.name')} value={project.name} />
      <InfoField
        label={t('projectPage.createdAt')}
        value={new Date(project.createdAt).toLocaleString()}
      />
      <InfoField label={t('projectPage.code')} value={project.code} />
      <InfoField
        label={t('projectPage.methodology')}
        value={<MethodologyBadge label={project.methodology} />}
      />
      <InfoField label={t('projectPage.description')} value={project.description} />
    </StyledSectionWrapper>
  );
};
