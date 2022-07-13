import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { InfoField } from 'Shared/Elements/InfoField';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Organisation } from 'Types/Organisation';
import { StyledDescriptionField } from './OrganisationInfoSection.styled';

interface Props {
  organisationData: Organisation.OrganisationEntity;
}

export const OrganisationInfoSection = ({ organisationData }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{organisationData.name}</Heading6>
      </StyledSectionHeaderRow>
      <StyledDescriptionField>{organisationData.description}</StyledDescriptionField>
      <InfoField
        label={t('organisationPage.info.createdAt')}
        value={new Date(organisationData.createdAt).toLocaleString()}
      />
      {organisationData.updatedAt && (
        <InfoField
          label={t('organisationPage.info.updatedAt')}
          value={new Date(organisationData.updatedAt).toLocaleString()}
        />
      )}
    </StyledSectionWrapper>
  );
};
