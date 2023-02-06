import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import {
  StyledHorizontalContainer,
  StyledSectionContainer,
  VerticalPageWrapper
} from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { ApplicationState } from 'Stores/store';
import { actionCreators as userActionCreators } from 'Stores/User';
import { actionCreators as invitationActionCreators } from 'Stores/OrganisationInvitation';
import { Api } from 'Utils/Api';
import { Organisation } from 'Types/Organisation';
import { PermissionCheck } from 'Utils/PermissionCheck';
import { ProjectDialog } from 'Modules/ProjectDialog';
import { OrganisationDialog, ORGANISATION_DIALOG_MODES } from 'Modules/OrganisationDialog';
import { PROJECT_DIALOG_MODES } from '../ProjectDialog/fixtures';
import {
  InviteMemberDialog,
  OrganisationInfoSection,
  OrganisationInvitationsSection,
  OrganisationMembersSection,
  ProjectsSection
} from './components';
import { INVITE_MEMBER_DIALOG_MODES } from './components/InviteMemberDialog/fixtures';

export const OrganisationPage = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const inviteDialogConfig = useDialog<INVITE_MEMBER_DIALOG_MODES>(INVITE_MEMBER_DIALOG_MODES.ADD);
  const projectDialogConfig = useDialog<PROJECT_DIALOG_MODES>(PROJECT_DIALOG_MODES.ADD);
  const organisationDialogConfig = useDialog<ORGANISATION_DIALOG_MODES>(
    ORGANISATION_DIALOG_MODES.EDIT
  );

  React.useEffect(() => {
    dispatch(userActionCreators.getOrganisation());
  }, [dispatch]);

  const organisationData: Nullable<Organisation.OrganisationEntity> = useSelector(
    (state: ApplicationState) => (state.user ? state.user.organisation : null)
  );

  const invitationsData: Nullable<Organisation.OrganisationInvitation[]> = useSelector(
    (state: ApplicationState) =>
      state.organisationInvitation ? state.organisationInvitation.allInvitations : null
  );

  React.useEffect(() => {
    if (organisationData && organisationData.id && PermissionCheck.isOrganisationAdmin) {
      dispatch(invitationActionCreators.getAllInvitationsForOrganisation(organisationData.id));
    }
  }, [dispatch, organisationData, organisationData?.id]);

  const handleOpeningInviteDialog = (): void => {
    inviteDialogConfig.handleOpen(INVITE_MEMBER_DIALOG_MODES.ADD);
  };

  const handleOpenEditOrganisationInfo = (): void => {
    organisationDialogConfig.handleOpen(ORGANISATION_DIALOG_MODES.EDIT);
  };

  const handleOpeningAddProject = () => {
    projectDialogConfig.handleOpen(PROJECT_DIALOG_MODES.ADD);
  };

  const handleRevokingInvitation = (id: Id) => async () => {
    if (organisationData) {
      const result = await Api.post(`organisations/${organisationData.id}/revoke_invitation`, {
        userId: id
      });

      if (result.status === 200) {
        dispatch(invitationActionCreators.getAllInvitationsForOrganisation(organisationData.id));
      }
    }
  };

  const renderOrganisationInfo = (): Nullable<JSX.Element> => {
    if (organisationData) {
      return (
        <OrganisationInfoSection
          organisationData={organisationData}
          handleOpenEditOrganisationInfo={handleOpenEditOrganisationInfo}
        />
      );
    }

    return null;
  };

  const renderProjects = (): Nullable<JSX.Element> => {
    if (organisationData) {
      return (
        <ProjectsSection
          projectsData={organisationData.projects}
          handleOpeningAddProject={handleOpeningAddProject}
        />
      );
    }

    return null;
  };

  const renderOrganisationMembers = (): Nullable<JSX.Element> => {
    if (organisationData) {
      return <OrganisationMembersSection membersData={organisationData.members} />;
    }

    return null;
  };

  const renderInvitations = (): Nullable<JSX.Element> => {
    if (invitationsData && PermissionCheck.isOrganisationAdmin) {
      return (
        <OrganisationInvitationsSection
          invitationsData={invitationsData}
          handleOpeningInviteDialog={handleOpeningInviteDialog}
          handleRevokingInvitation={handleRevokingInvitation}
        />
      );
    }

    return null;
  };

  const renderDialogs = (): JSX.Element => (
    <React.Fragment>
      <DialogComponent
        isOpen={inviteDialogConfig.isOpen}
        handleClose={inviteDialogConfig.handleClose}
      >
        <InviteMemberDialog
          mode={inviteDialogConfig.dialogMode}
          handleClose={inviteDialogConfig.handleClose}
          organisationId={organisationData?.id}
        />
      </DialogComponent>
      <DialogComponent
        isOpen={projectDialogConfig.isOpen}
        handleClose={projectDialogConfig.handleClose}
      >
        <ProjectDialog
          mode={projectDialogConfig.dialogMode}
          handleClose={projectDialogConfig.handleClose}
        />
      </DialogComponent>
      <DialogComponent
        isOpen={organisationDialogConfig.isOpen}
        handleClose={organisationDialogConfig.handleClose}
      >
        <OrganisationDialog
          organisationId={organisationData?.id}
          handleClose={organisationDialogConfig.handleClose}
        />
      </DialogComponent>
    </React.Fragment>
  );

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
      {renderDialogs()}
    </VerticalPageWrapper>
  );
};
