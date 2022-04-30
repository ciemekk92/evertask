import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { IconButton } from 'Shared/Elements/Buttons';
import { OrganisationInvitation } from 'Types/Organisation';
import { InvitationPanel } from '../';
import { StyledWrapper, StyledHeaderRow } from '../../OrganisationPage.styled';

interface Props {
  invitationsData: OrganisationInvitation[];
  handleOpeningInviteDialog: VoidFunctionNoArgs;
  handleRevokingInvitation: (id: Id) => () => Promise<void>;
}

export const InvitationsSection = ({
  invitationsData,
  handleRevokingInvitation,
  handleOpeningInviteDialog
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderInvitations = (): JSX.Element[] | JSX.Element => {
    if (invitationsData.length) {
      return invitationsData.map((invitation: OrganisationInvitation) => (
        <InvitationPanel
          handleRevokingInvitation={handleRevokingInvitation(invitation.user.id)}
          key={invitation.id}
          invitation={invitation}
        />
      ));
    }

    return <p>{t('organisationPage.noInvitations')}</p>;
  };

  return (
    <StyledWrapper>
      <StyledHeaderRow>
        <Heading6>{t('organisationPage.invitations')}</Heading6>
        <IconButton iconName="add" onClick={handleOpeningInviteDialog}>
          {t('organisationPage.inviteMember')}
        </IconButton>
      </StyledHeaderRow>
      {renderInvitations()}
    </StyledWrapper>
  );
};
