import React from 'react';
import { useParams } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'Stores/store';
import { actionCreators, ProjectState } from 'Stores/Project';
import {
  StyledHorizontalContainer,
  StyledSectionContainer,
  VerticalPageWrapper
} from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { isDefined } from 'Utils/isDefined';
import { Container } from 'Hooks/useLoading';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import {
  ProjectActiveMembersSection,
  ProjectInfoSection,
  ProjectLastIssuesSection,
  ProjectSprintsSection
} from './components';
import { SPRINT_DIALOG_MODES } from '../SprintDialog/fixtures';
import { SprintDialog } from '../SprintDialog';
import { StyledHeaderWrapper } from './ProjectPage.styled';

export const ProjectPage = (): Nullable<JSX.Element> => {
  const params = useParams<RouterParams>();
  const dispatch = useDispatch();
  const projectState: Nullable<ProjectState> = useSelector(
    (state: ApplicationState) => (state.project ? state.project : null),
    shallowEqual
  );

  const sprintDialogConfig = useDialog<SPRINT_DIALOG_MODES>(SPRINT_DIALOG_MODES.ADD);

  const handleRefreshingProjectState = React.useCallback(
    (id: Id) => {
      dispatch(actionCreators.getSelectedProject(id));
      dispatch(actionCreators.getActiveMembers(id));
      dispatch(actionCreators.getSprints(id));
      dispatch(actionCreators.getLastIssues(id));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (isDefined(params.id)) {
      handleRefreshingProjectState(params.id);
    }
  }, [params.id, handleRefreshingProjectState]);

  if (!projectState || !params.id) {
    return null;
  }

  const handleOpeningAddSprint = (): void => {
    sprintDialogConfig.handleOpen(SPRINT_DIALOG_MODES.ADD);
  };

  const handleOpeningEditSprint = (id: Id) => (): void => {
    sprintDialogConfig.handleOpen(SPRINT_DIALOG_MODES.EDIT, { sprintId: id });
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
      handleOpeningEditSprint={handleOpeningEditSprint}
      activeSprintId={projectState.selectedProject.activeSprint?.id}
      projectId={projectState.selectedProject.id}
      handleRefreshingProjectState={handleRefreshingProjectState}
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
          sprintId={sprintDialogConfig.params.sprintId}
        />
      </DialogComponent>
    </VerticalPageWrapper>
  );
};
