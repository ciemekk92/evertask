import React from 'react';
import { OrganisationInvitation } from 'Types/Organisation';
import { StyledInvitationPanel } from './InvitationPanel.styled';

interface Props {
  invitation: OrganisationInvitation;
}

export const InvitationPanel = ({ invitation }: Props): JSX.Element => {
  return <StyledInvitationPanel></StyledInvitationPanel>;
};
