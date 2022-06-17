import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { InfoField } from 'Shared/Elements/InfoField';
import { ButtonFilled } from 'Shared/Elements/Buttons';
import { formatDateForDisplay } from 'Utils/formatDate';

interface Props {
  sprint: Sprint.SprintEntity;
  onEditClick: VoidFunctionNoArgs;
}

export const SprintInfoSection = ({ sprint, onEditClick }: Props): Nullable<JSX.Element> => {
  const { t } = useTranslation();

  if (!sprint.id) {
    return null;
  }

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('sprintPage.infoTitle')}</Heading6>
        <ButtonFilled onClick={onEditClick}>{t('general.edit')}</ButtonFilled>
      </StyledSectionHeaderRow>
      <InfoField label={t('sprintPage.createdAt')} value={formatDateForDisplay(sprint.createdAt)} />
      <InfoField label={t('sprintPage.startDate')} value={formatDateForDisplay(sprint.startDate)} />
      <InfoField
        label={t('sprintPage.finishDate')}
        value={formatDateForDisplay(sprint.finishDate)}
      />
      <InfoField label={t('sprintPage.description')} value={sprint.description} />
    </StyledSectionWrapper>
  );
};
