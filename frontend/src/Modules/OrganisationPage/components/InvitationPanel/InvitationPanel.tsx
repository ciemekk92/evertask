import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from 'Shared/Elements/Buttons';
import { Organisation } from 'Types/Organisation';
import { StyledInfoContainer, StyledPanelContainer } from './InvitationPanel.styled';

interface Props {
  invitation: Organisation.OrganisationInvitation;
  handleRevokingInvitation: VoidFunctionNoArgs;
}

export const InvitationPanel = ({ invitation, handleRevokingInvitation }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledPanelContainer>
      <StyledInfoContainer>
        <p>
          {invitation.user.firstName} {invitation.user.lastName} ({invitation.user.username})
        </p>
        <span>
          {t('general.sentAt')} {new Date(invitation.createdAt).toLocaleString()}
        </span>
      </StyledInfoContainer>
      <IconButton onClick={handleRevokingInvitation} iconName="close">
        {t('organisationPage.revokeInvitation')}
      </IconButton>
    </StyledPanelContainer>
  );
};
