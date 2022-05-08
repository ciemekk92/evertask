import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { InfoField } from 'Shared/Elements/InfoField';
import { MethodologyBadge } from 'Shared/MethodologyBadge';
import { Heading6 } from 'Shared/Typography';
import { Project } from 'Types/Project';

interface Props {
  project: Project.ProjectEntity;
}

export const ProjectInfoSection = ({ project }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('projectPage.infoTitle')}</Heading6>
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
