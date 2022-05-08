import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { IconButton } from 'Shared/Elements/Buttons';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { InvitationPanel } from '../';

interface Props {
  invitationsData: Organisation.OrganisationInvitation[];
  handleOpeningInviteDialog: VoidFunctionNoArgs;
  handleRevokingInvitation: (id: Id) => () => Promise<void>;
}

export const OrganisationInvitationsSection = ({
  invitationsData,
  handleRevokingInvitation,
  handleOpeningInviteDialog
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderInvitations = (): JSX.Element[] | JSX.Element => {
    if (invitationsData.length) {
      return invitationsData.map((invitation: Organisation.OrganisationInvitation) => (
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
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('organisationPage.invitations')}</Heading6>
        <IconButton iconName="add" onClick={handleOpeningInviteDialog}>
          {t('organisationPage.inviteMember')}
        </IconButton>
      </StyledSectionHeaderRow>
      {renderInvitations()}
    </StyledSectionWrapper>
  );
};
