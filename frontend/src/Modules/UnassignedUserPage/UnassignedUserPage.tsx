import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Heading5, Heading6 } from 'Shared/Typography';
import { OrganisationForm } from 'Shared/Forms/OrganisationForm';
import { Api } from 'Utils/Api';
import { actionCreators as userActionCreators } from 'Stores/User';
import { actionCreators as invitationsActionCreators } from 'Stores/OrganisationInvitation';
import { ApplicationState } from 'Stores/store';
import { Organisation } from 'Types/Organisation';
import { InvitationPanel } from './components';
import {
  StyledFormContainer,
  StyledHorizontalContainer,
  StyledInvitationsContainer,
  StyledPageWrapper
} from './UnassignedUserPage.styled';

export const UnassignedUserPage = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInvitations = useSelector(
    (state: ApplicationState) =>
      state.organisationInvitation ? state.organisationInvitation.userInvitations : [],
    shallowEqual
  );

  React.useEffect(() => {
    dispatch(invitationsActionCreators.getUserInvitations());
  }, [dispatch]);

  const handleCreatingOrganisation = async (data: Organisation.OrganisationPayload) => {
    const result = await Api.post('organisations', data);

    if (result.status === 201) {
      dispatch(userActionCreators.refresh());
    }
  };

  const handleSendingInvitationResponseFactory =
    (organisationId: Id, shouldAccept: boolean) => async () => {
      const result = await Api.post(
        `organisations/${organisationId}/${shouldAccept ? 'accept' : 'decline'}_invitation`
      );

      if (result.status === 200) {
        if (shouldAccept) {
          dispatch(userActionCreators.refresh());
        } else {
          dispatch(invitationsActionCreators.getUserInvitations());
        }
      }
    };

  const renderInvitations = (): JSX.Element[] | JSX.Element => {
    if (userInvitations.length) {
      return userInvitations.map((invitation) => (
        <InvitationPanel
          handleSendingInvitationResponse={handleSendingInvitationResponseFactory}
          key={invitation.id}
          invitation={invitation}
        />
      ));
    }

    return <p>{t('unassignedUserPage.noInvitations')}</p>;
  };

  return (
    <StyledPageWrapper>
      <Heading5>{t('unassignedUserPage.title')}</Heading5>
      <p>{t('unassignedUserPage.content')}</p>
      <StyledHorizontalContainer>
        <StyledFormContainer>
          <Heading6>{t('unassignedUserPage.createNewOrganisation')}</Heading6>
          <OrganisationForm handleSubmit={handleCreatingOrganisation} />
        </StyledFormContainer>
        <StyledInvitationsContainer>
          <Heading6>{t('unassignedUserPage.invitationsTitle')}</Heading6>
          {renderInvitations()}
        </StyledInvitationsContainer>
      </StyledHorizontalContainer>
    </StyledPageWrapper>
  );
};
