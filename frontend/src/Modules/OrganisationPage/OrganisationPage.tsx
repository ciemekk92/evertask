import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { USER_ROLES } from 'Shared/constants';
import { UserModel } from 'Models/UserModel';
import { ApplicationState } from 'Stores/store';
import { actionCreators as userActionCreators } from 'Stores/User';
import { actionCreators as invitationActionCreators } from 'Stores/OrganisationInvitation';
import { Organisation, OrganisationInvitation } from 'Types/Organisation';
import {
  InfoSection,
  InvitationsSection,
  InviteMemberDialog,
  MembersSection,
  ProjectsSection
} from './components';
import { INVITE_MEMBER_DIALOG_MODES } from './components/InviteMemberDialog/fixtures';

import { StyledHorizontalContainer, StyledSectionContainer } from './OrganisationPage.styled';

export const OrganisationPage = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpen, dialogMode, handleOpen, handleClose } = useDialog<INVITE_MEMBER_DIALOG_MODES>(
    INVITE_MEMBER_DIALOG_MODES.ADD
  );

  const isUserOrganisationAdmin = [USER_ROLES.ROLE_ORGANISATION_ADMIN, USER_ROLES.ROLE_ADMIN].some(
    (role: USER_ROLES) => UserModel.currentUserValue.authorities.includes(role)
  );

  React.useEffect(() => {
    dispatch(userActionCreators.getOrganisation());
  }, []);

  const organisationData: Nullable<Organisation> = useSelector((state: ApplicationState) =>
    state.user ? state.user.organisation : null
  );

  const invitationsData: Nullable<OrganisationInvitation[]> = useSelector(
    (state: ApplicationState) =>
      state.organisationInvitation ? state.organisationInvitation.allInvitations : null
  );

  React.useEffect(() => {
    if (organisationData && organisationData.id && isUserOrganisationAdmin) {
      dispatch(invitationActionCreators.getAllInvitationsForOrganisation(organisationData.id));
    }
  }, [organisationData?.id]);

  const handleOpeningInviteDialog = () => {
    handleOpen(INVITE_MEMBER_DIALOG_MODES.ADD);
  };

  const renderOrganisationInfo = (): Nullable<JSX.Element> => {
    if (organisationData) {
      return <InfoSection organisationData={organisationData} />;
    }

    return null;
  };

  const renderProjects = (): Nullable<JSX.Element> => {
    if (organisationData) {
      return <ProjectsSection projectsData={organisationData.projects} />;
    }

    return null;
  };

  const renderOrganisationMembers = (): Nullable<JSX.Element> => {
    if (organisationData) {
      return <MembersSection membersData={organisationData.members} />;
    }

    return null;
  };

  const renderInvitations = (): Nullable<JSX.Element> => {
    if (invitationsData && isUserOrganisationAdmin) {
      return (
        <InvitationsSection
          invitationsData={invitationsData}
          handleOpeningInviteDialog={handleOpeningInviteDialog}
        />
      );
    }

    return null;
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <Heading5>{t('organisationPage.title')}</Heading5>
      <StyledHorizontalContainer>
        <StyledSectionContainer>
          {renderOrganisationInfo()}
          {renderProjects()}
        </StyledSectionContainer>
        <StyledSectionContainer>
          {renderOrganisationMembers()}
          {renderInvitations()}
        </StyledSectionContainer>
      </StyledHorizontalContainer>
      <DialogComponent isOpen={isOpen} handleClose={handleClose}>
        <InviteMemberDialog
          mode={dialogMode}
          handleClose={handleClose}
          organisationId={organisationData?.id}
        />
      </DialogComponent>
    </VerticalPageWrapper>
  );
};
