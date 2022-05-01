import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import {
  StyledDescriptionField,
  StyledInfoContent,
  StyledInfoField,
  StyledInfoLabel
} from './InfoSection.styled';
import { StyledWrapper, StyledHeaderRow } from '../../OrganisationPage.styled';

interface Props {
  organisationData: Organisation.OrganisationEntity;
}

export const InfoSection = ({ organisationData }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <StyledHeaderRow>
        <Heading6>{organisationData.name}</Heading6>
      </StyledHeaderRow>
      <StyledDescriptionField>{organisationData.description}</StyledDescriptionField>
      <StyledInfoField>
        <StyledInfoLabel>{t('organisationPage.info.createdAt')}</StyledInfoLabel>
        <StyledInfoContent>
          {new Date(organisationData.createdAt).toLocaleString()}
        </StyledInfoContent>
      </StyledInfoField>
      {organisationData.updatedAt && (
        <StyledInfoField>
          <StyledInfoLabel>{t('organisationPage.info.updatedAt')}</StyledInfoLabel>
          <StyledInfoContent>
            {new Date(organisationData.updatedAt).toLocaleString()}
          </StyledInfoContent>
        </StyledInfoField>
      )}
    </StyledWrapper>
  );
};
