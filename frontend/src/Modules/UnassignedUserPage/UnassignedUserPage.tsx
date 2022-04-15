import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading5, Heading6 } from 'Shared/Typography';
import { OrganisationForm } from 'Shared/Forms/OrganisationForm';
import { Container, useLoading } from 'Hooks/useLoading';
import { OrganisationPayload } from 'Types/Organisation';
import { Api } from 'Utils/Api';
import {
  StyledFormContainer,
  StyledHorizontalContainer,
  StyledInvitationsContainer,
  StyledPageWrapper
} from './UnassignedUserPage.styled';

export const UnassignedUserPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleCreatingOrganisation = async (data: OrganisationPayload) => {
    startLoading();

    const result = await Api.post('organisations', data);

    stopLoading();
    if (result.status === 201) {
      // TODO: Refresh user data, to get his new role as organisation admin
    }
  };

  return (
    <StyledPageWrapper>
      <Container isLoading={isLoading} />
      <Heading5>{t('unassignedUserPage.title')}</Heading5>
      <p>{t('unassignedUserPage.content')}</p>
      <StyledHorizontalContainer>
        <StyledFormContainer>
          <Heading6>{t('unassignedUserPage.createNewOrganisation')}</Heading6>
          <OrganisationForm handleSubmit={handleCreatingOrganisation} />
        </StyledFormContainer>
        <StyledInvitationsContainer>
          <Heading6>{t('unassignedUserPage.invitationsTitle')}</Heading6>
        </StyledInvitationsContainer>
      </StyledHorizontalContainer>
    </StyledPageWrapper>
  );
};
