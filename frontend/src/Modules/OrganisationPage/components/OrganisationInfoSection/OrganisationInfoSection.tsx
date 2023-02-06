import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from 'Shared/Elements/Buttons';
import { InfoField } from 'Shared/Elements/InfoField';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { Organisation } from 'Types/Organisation';
import { PermissionCheck } from 'Utils/PermissionCheck';
import { StyledDescriptionField } from './OrganisationInfoSection.styled';

interface Props {
  organisationData: Organisation.OrganisationEntity;
  handleOpenEditOrganisationInfo: VoidFunctionNoArgs;
}

export const OrganisationInfoSection = ({
  organisationData,
  handleOpenEditOrganisationInfo
}: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{organisationData.name}</Heading6>
        {PermissionCheck.isOrganisationAdmin && (
          <IconButton iconName="edit" onClick={handleOpenEditOrganisationInfo}>
            {t('organisationPage.info.editOrganisation')}
          </IconButton>
        )}
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
