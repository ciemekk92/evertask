import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5, Heading6 } from 'Shared/Typography';
import { USER_ROLES } from 'Shared/constants';
import { UserModel } from 'Models/UserModel';
import { ApplicationState } from 'Stores/store';
import { actionCreators as userActionCreators } from 'Stores/User';
import { actionCreators as invitationActionCreators } from 'Stores/OrganisationInvitation';
import { Organisation } from 'Types/Organisation';
import { User } from 'Types/User';
import { InfoSection, MemberPanel } from './components';
import { StyledHorizontalContainer, StyledSectionContainer } from './OrganisationPage.styled';

export const OrganisationPage = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isUserOrganisationAdmin = [USER_ROLES.ROLE_ORGANISATION_ADMIN, USER_ROLES.ROLE_ADMIN].some(
    (role: USER_ROLES) => UserModel.currentUserValue.authorities.includes(role)
  );

  React.useEffect(() => {
    dispatch(userActionCreators.getOrganisation());
  }, []);

  const organisationData: Nullable<Organisation> = useSelector((state: ApplicationState) =>
    state.user ? state.user.organisation : null
  );

  React.useEffect(() => {
    if (organisationData && organisationData.id && isUserOrganisationAdmin) {
      dispatch(invitationActionCreators.getAllInvitationsForOrganisation(organisationData.id));
    }
  }, [organisationData?.id]);

  const renderOrganisationInfo = (): Nullable<JSX.Element> => {
    if (organisationData) {
      return <InfoSection organisationData={organisationData} />;
    }

    return null;
  };

  const renderOrganisationMembers = (): Nullable<JSX.Element> => {
    if (organisationData) {
      return (
        <React.Fragment>
          <Heading6>{t('organisationPage.members')}</Heading6>
          {organisationData.members.map((user: User) => (
            <MemberPanel key={user.id} user={user} />
          ))}
        </React.Fragment>
      );
    }

    return null;
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <Heading5>{t('organisationPage.title')}</Heading5>
      <StyledHorizontalContainer>
        <StyledSectionContainer>{renderOrganisationInfo()}</StyledSectionContainer>
        <StyledSectionContainer>{renderOrganisationMembers()}</StyledSectionContainer>
      </StyledHorizontalContainer>
    </VerticalPageWrapper>
  );
};
