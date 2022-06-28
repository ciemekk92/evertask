import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Container, useLoading } from 'Hooks/useLoading';
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
  const { startLoading, stopLoading, isLoading } = useLoading();

  const projectState: Nullable<ProjectState> = useSelector(
    (state: ApplicationState) => (state.project ? state.project : null),
    shallowEqual
  );

  const issueState: Nullable<IssueState> = useSelector(
    (state: ApplicationState) => (state.issue ? state.issue : null),
    shallowEqual
  );

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

  const renderSprints = (): Nullable<JSX.Element[]> => {
    if (CurrentProjectModel.currentProjectValue.methodology === PROJECT_METHODOLOGIES.KANBAN) {
      return null;
    }

    return projectState.notCompletedSprints.map((sprint: Sprint.SprintIssuesEntity) => (
      <SprintSection key={sprint.id} sprint={sprint} />
    ));
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
      const projectId = CurrentProjectModel.currentProjectValue.id;
      dispatch(projectActionCreators.getNotCompletedSprints(projectId));
      dispatch(issueActionCreators.getIssuesUnassignedToSprint(projectId));
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
          <UnassignedIssues issues={issueState.issuesUnassignedToSprint} />
        </DragDropContext>
      </StyledVerticalContainer>
    </VerticalPageWrapper>
  );
};
