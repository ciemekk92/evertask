import React from 'react';
import { useParams } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { Heading5 } from 'Shared/Typography';
import {
  StyledHorizontalContainer,
  StyledSectionContainer,
  VerticalPageWrapper
} from 'Shared/PageWrappers';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';
import { ApplicationState } from 'Stores/store';
import { actionCreators, ProjectState } from 'Stores/Project';
import { isDefined } from 'Utils/isDefined';
import { SPRINT_DIALOG_MODES, SprintDialog } from '../SprintDialog';
import {
  ProjectActiveMembersSection,
  ProjectInfoSection,
  ProjectLastIssuesSection,
  ProjectSprintsSection
} from './components';
import { ProjectDialog } from '../ProjectDialog';
import { PROJECT_DIALOG_MODES } from '../ProjectDialog/fixtures';

export const ProjectPage = (): Nullable<JSX.Element> => {
  const params = useParams<RouterParams>();
  const dispatch = useDispatch();
  const projectState: Nullable<ProjectState> = useSelector(
    (state: ApplicationState) => (state.project ? state.project : null),
    shallowEqual
  );

  const sprintDialogConfig = useDialog<SPRINT_DIALOG_MODES>(SPRINT_DIALOG_MODES.ADD);
  const projectDialogConfig = useDialog<PROJECT_DIALOG_MODES>(PROJECT_DIALOG_MODES.EDIT);

  const handleRefreshingProjectState = React.useCallback(
    (id: Id) => {
      dispatch(actionCreators.getSelectedProject(id));
      dispatch(actionCreators.getActiveMembers(id));
      dispatch(actionCreators.getNotCompletedSprints(id));
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

  const handleOpeningAddSprint = async (): Promise<void> => {
    const result = await sprintDialogConfig.handleOpen(SPRINT_DIALOG_MODES.ADD);

    if (params.id && result) {
      dispatch(actionCreators.getNotCompletedSprints(params.id));
    }
  };

  const handleOpeningEditSprint = (id: Id) => async (): Promise<void> => {
    const result = await sprintDialogConfig.handleOpen(SPRINT_DIALOG_MODES.EDIT, { sprintId: id });

    if (params.id && result) {
      dispatch(actionCreators.getNotCompletedSprints(params.id));
    }
  };

  const handleOpeningEditProject = async (): Promise<void> => {
    const result = await projectDialogConfig.handleOpen(PROJECT_DIALOG_MODES.EDIT, {
      projectId: params.id
    });

    if (params.id && result) {
      handleRefreshingProjectState(params.id);
    }
  };

  const renderProjectInfo = (): JSX.Element => (
    <ProjectInfoSection
      project={projectState.selectedProject}
      handleOpeningEditProject={handleOpeningEditProject}
    />
  );

  const renderMembersSection = (): JSX.Element => (
    <ProjectActiveMembersSection membersData={projectState.activeMembers} />
  );

  const renderSprintsSection = (): JSX.Element => (
    <ProjectSprintsSection
      sprintsData={projectState.notCompletedSprints}
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
      <StyledFlexContainer>
        <Heading5>{projectState.selectedProject.name}</Heading5>
      </StyledFlexContainer>
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
          handleSubmitting={sprintDialogConfig.handleSubmit}
          projectId={params.id}
          sprintId={sprintDialogConfig.params.sprintId}
        />
      </DialogComponent>
      <DialogComponent
        isOpen={projectDialogConfig.isOpen}
        handleClose={projectDialogConfig.handleClose}
      >
        <ProjectDialog
          mode={projectDialogConfig.dialogMode}
          handleClose={projectDialogConfig.handleClose}
          projectId={projectDialogConfig.params.projectId}
        />
      </DialogComponent>
    </VerticalPageWrapper>
  );
};
