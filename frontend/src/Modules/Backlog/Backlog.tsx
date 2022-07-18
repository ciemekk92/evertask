import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Container, useLoading } from 'Hooks/useLoading';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { ISSUE_DIALOG_MODES, IssueDialog } from 'Modules/IssueDialog';
import { ApplicationState } from 'Stores/store';
import { actionCreators as projectActionCreators, ProjectState } from 'Stores/Project';
import { actionCreators as issueActionCreators, IssueState } from 'Stores/Issue';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { StyledVerticalContainer, VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { PROJECT_METHODOLOGIES } from 'Shared/constants';
import { Project } from 'Types/Project';
import { Sprint } from 'Types/Sprint';
import { Api } from 'Utils/Api';
import { SprintSection, UnassignedIssues } from './components';

export const Backlog = (): Nullable<JSX.Element> => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const issueDialogConfig = useDialog<ISSUE_DIALOG_MODES>(ISSUE_DIALOG_MODES.ADD);

  const projectState: Nullable<ProjectState> = useSelector(
    (state: ApplicationState) => (state.project ? state.project : null),
    shallowEqual
  );

  const issueState: Nullable<IssueState> = useSelector(
    (state: ApplicationState) => (state.issue ? state.issue : null),
    shallowEqual
  );

  const currentProject = CurrentProjectModel.currentProjectValue;

  React.useEffect(() => {
    const subscription = CurrentProjectModel.currentProject.subscribe(
      (project: Project.ProjectEntity) => {
        if (project.id) {
          if (project.methodology === PROJECT_METHODOLOGIES.AGILE) {
            dispatch(projectActionCreators.getNotCompletedSprints(project.id));
          }
          dispatch(issueActionCreators.getIssuesUnassignedToSprint(project.id));
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  if (!projectState || !issueState) {
    return null;
  }

  const handleViewingIssue =
    (issueId: Id): VoidFunctionNoArgs =>
    () => {
      navigate(`/issue/${issueId}`);
    };

  const handleRefreshingData = () => {
    if (currentProject.methodology === PROJECT_METHODOLOGIES.AGILE) {
      dispatch(projectActionCreators.getNotCompletedSprints(currentProject.id));
    }

    dispatch(issueActionCreators.getIssuesUnassignedToSprint(currentProject.id));
  };

  const handleOpeningAddIssue = async (sprintId: Nullable<Id>) => {
    const result = await issueDialogConfig.handleOpen(ISSUE_DIALOG_MODES.ADD, {
      initialSprintId: sprintId
    });

    if (result) {
      handleRefreshingData();
    }
  };

  const handleOpeningEditIssue = (issueId: Id) => async () => {
    const result = await issueDialogConfig.handleOpen(ISSUE_DIALOG_MODES.EDIT, { issueId });

    if (result) {
      handleRefreshingData();
    }
  };

  const renderSprints = (): Nullable<JSX.Element[]> => {
    if (currentProject.methodology === PROJECT_METHODOLOGIES.AGILE) {
      return projectState.notCompletedSprints.map((sprint: Sprint.SprintIssuesEntity) => (
        <SprintSection
          key={sprint.id}
          sprint={sprint}
          handleOpeningAddIssue={handleOpeningAddIssue}
          handleOpeningEditIssue={handleOpeningEditIssue}
          handleViewingIssue={handleViewingIssue}
        />
      ));
    }

    return null;
  };

  const onDragEnd = async (result: DropResult): Promise<void> => {
    startLoading();

    if (!result.destination || result.source.droppableId === result.destination.droppableId) {
      stopLoading();
      return;
    }

    const targetSprintId =
      result.destination.droppableId === 'unassigned' ? null : result.destination.droppableId;

    const req = await Api.put(`issues/${result.draggableId}/move_issue`, {
      targetSprintId
    });

    if (req.status === 204) {
      dispatch(projectActionCreators.getNotCompletedSprints(currentProject.id));
      dispatch(issueActionCreators.getIssuesUnassignedToSprint(currentProject.id));
    }
    stopLoading();
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <Container isLoading={isLoading || projectState.isLoading} />
      <Heading5>{t('backlog.title')}</Heading5>
      <StyledVerticalContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {renderSprints()}
          <UnassignedIssues
            issues={issueState.issuesUnassignedToSprint}
            handleOpeningAddIssue={handleOpeningAddIssue}
            handleOpeningEditIssue={handleOpeningEditIssue}
            handleViewingIssue={handleViewingIssue}
          />
        </DragDropContext>
      </StyledVerticalContainer>
      <DialogComponent
        isOpen={issueDialogConfig.isOpen}
        handleClose={issueDialogConfig.handleClose}
      >
        <IssueDialog
          mode={issueDialogConfig.dialogMode}
          handleClose={issueDialogConfig.handleClose}
          handleSubmitting={issueDialogConfig.handleSubmit}
          initialSprintId={issueDialogConfig.params.initialSprintId}
          issueId={issueDialogConfig.params.issueId}
        />
      </DialogComponent>
    </VerticalPageWrapper>
  );
};
