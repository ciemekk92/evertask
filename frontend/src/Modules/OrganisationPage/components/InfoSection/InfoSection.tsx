import React from 'react';
import { useTranslation } from 'react-i18next';
import { Organisation } from 'Types/Organisation';
import { StyledInfoContent, StyledInfoField, StyledInfoLabel } from './InfoSection.styled';

interface Props {
  organisationData: Organisation;
}

export const InfoSection = ({ organisationData }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <StyledInfoField>
        <StyledInfoLabel>{t('organisationPage.info.name')}</StyledInfoLabel>
        <StyledInfoContent>{organisationData.name}</StyledInfoContent>
      </StyledInfoField>
      <StyledInfoField>
        <StyledInfoLabel>{t('organisationPage.info.description')}</StyledInfoLabel>
        <StyledInfoContent>{organisationData.description}</StyledInfoContent>
      </StyledInfoField>
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
    </React.Fragment>
  );
};
