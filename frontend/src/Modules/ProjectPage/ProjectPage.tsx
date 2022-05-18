import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'Stores/store';
import { actionCreators, ProjectState } from 'Stores/Project';
import {
  VerticalPageWrapper,
  StyledHorizontalContainer,
  StyledSectionContainer
} from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { isDefined } from 'Utils/isDefined';
import { Container } from 'Hooks/useLoading';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import {
  ProjectInfoSection,
  ProjectActiveMembersSection,
  ProjectSprintsSection,
  ProjectLastIssuesSection
} from './components';
import { SPRINT_DIALOG_MODES } from '../SprintDialog/fixtures';
import { SprintDialog } from '../SprintDialog';
import { StyledHeaderWrapper } from './ProjectPage.styled';

type Params = {
  id: Id;
};

export const ProjectPage = (): Nullable<JSX.Element> => {
  const params = useParams<Params>();
  const dispatch = useDispatch();
  const projectState: Nullable<ProjectState> = useSelector((state: ApplicationState) =>
    state.project ? state.project : null
  );

  const sprintDialogConfig = useDialog<SPRINT_DIALOG_MODES>(SPRINT_DIALOG_MODES.ADD);

  React.useEffect(() => {
    if (isDefined(params.id)) {
      dispatch(actionCreators.getSelectedProject(params.id));
      dispatch(actionCreators.getActiveMembers(params.id));
      dispatch(actionCreators.getSprints(params.id));
      dispatch(actionCreators.getLastIssues(params.id));
    }
  }, [params.id, dispatch]);

  if (!projectState || !params.id) {
    return null;
  }

  const handleOpeningAddSprint = (): void => {
    sprintDialogConfig.handleOpen(SPRINT_DIALOG_MODES.ADD);
  };

  const renderProjectInfo = (): JSX.Element => (
    <ProjectInfoSection project={projectState.selectedProject} />
  );

  const renderMembersSection = (): JSX.Element => (
    <ProjectActiveMembersSection membersData={projectState.activeMembers} />
  );

  const renderSprintsSection = (): JSX.Element => (
    <ProjectSprintsSection
      sprintsData={projectState.sprints}
      handleOpeningAddSprint={handleOpeningAddSprint}
    />
  );

  const renderLastIssuesSection = (): JSX.Element => (
    <ProjectLastIssuesSection issuesData={projectState.lastIssues} />
  );

  return (
    <VerticalPageWrapper alignItems="unset">
      <Container isLoading={projectState.isLoading} />
      <StyledHeaderWrapper>
        <Heading5>{projectState.selectedProject.name}</Heading5>
      </StyledHeaderWrapper>
      <StyledHorizontalContainer>
        <StyledSectionContainer>
          {renderProjectInfo()}
          {renderSprintsSection()}
        </StyledSectionContainer>
        <StyledSectionContainer>
          {renderMembersSection()}
          {renderLastIssuesSection()}
        </StyledSectionContainer>
      </StyledHorizontalContainer>
      <DialogComponent
        isOpen={sprintDialogConfig.isOpen}
        handleClose={sprintDialogConfig.handleClose}
      >
        <SprintDialog
          mode={sprintDialogConfig.dialogMode}
          handleClose={sprintDialogConfig.handleClose}
          projectId={params.id}
        />
      </DialogComponent>
    </VerticalPageWrapper>
  );
};
