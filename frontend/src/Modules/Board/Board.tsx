import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { ISSUE_DIALOG_MODES, IssueDialog } from 'Modules/IssueDialog';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { ISSUE_STATUS, PROJECT_METHODOLOGIES } from 'Shared/constants';
import { StyledFlexContainerSpaceBetween } from 'Shared/SharedStyles.styled';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { capitalizeFirstLetter } from 'Utils/capitalizeFirstLetter';
import { Project } from 'Types/Project';
import { Issue } from 'Types/Issue';
import { ApplicationState } from 'Stores/store';
import { actionCreators } from 'Stores/Issue';
import { Api } from 'Utils/Api';
import { isEmpty } from 'Utils/isEmpty';
import { BoardColumn } from './components';
import { StyledDragDropContextContainer, StyledMessageContainer } from './Board.styled';

export const Board = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const issueDialogConfig = useDialog<ISSUE_DIALOG_MODES>(ISSUE_DIALOG_MODES.ADD);

  const currentIssues: Nullable<PartialRecord<ISSUE_STATUS, Issue.IssueEntity[]>> = useSelector(
    (state: ApplicationState) => (state.issue ? state.issue.boardIssues : null),
    shallowEqual
  );

  const currentProject = CurrentProjectModel.currentProjectValue;

  React.useEffect(() => {
    const subscription = CurrentProjectModel.currentProject.subscribe(
      (project: Project.ProjectEntity) => {
        if (project.id) {
          dispatch(actionCreators.getCurrentIssues(project.id));
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  const boardTitle = t('board.title', {
    methodology: capitalizeFirstLetter(currentProject.methodology)
  });

  const onDragEnd = async (result: DropResult): Promise<void> => {
    if (currentIssues) {
      if (!result.destination || result.source.droppableId === result.destination.droppableId) {
        return;
      }

      const targetStatus = result.destination.droppableId as ISSUE_STATUS;
      const sourceStatus = result.source.droppableId as ISSUE_STATUS;

      if (targetStatus === ISSUE_STATUS.CODE_REVIEW) {
        const dialogResult = await issueDialogConfig.handleOpen(ISSUE_DIALOG_MODES.EDIT, {
          issueId: result.draggableId,
          targetStatus
        });

        if (!dialogResult) {
          return;
        } else {
          dispatch(actionCreators.getCurrentIssues(currentProject.id));
        }
      } else {
        const issue = currentIssues[sourceStatus]?.find(
          (el: Issue.IssueEntity) => el.id === result.draggableId
        ) as Issue.IssueEntity;

        const req = await Api.put(`issues/${issue.id}`, {
          ...issue,
          status: targetStatus
        });

        if (req.status === 204) {
          dispatch(actionCreators.getCurrentIssues(currentProject.id));
        }
      }
    }
  };

  const handleViewingIssue =
    (issueId: Id): VoidFunctionNoArgs =>
    () => {
      navigate(`/issue/${issueId}`);
    };

  const renderAgileBoard = (): Nullable<JSX.Element> => {
    if (!currentProject.activeSprint) {
      return <StyledMessageContainer>{t('board.noCurrentSprint')}</StyledMessageContainer>;
    }

    if (isEmpty(currentIssues) || !currentIssues) {
      return <StyledMessageContainer>{t('board.noCurrentIssues')}</StyledMessageContainer>;
    }

    return (
      <StyledDragDropContextContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <StyledFlexContainerSpaceBetween>
            {Object.values(ISSUE_STATUS).map((status: ISSUE_STATUS) => (
              <BoardColumn
                handleViewingIssue={handleViewingIssue}
                key={status}
                label={status}
                elements={currentIssues[status]}
              />
            ))}
          </StyledFlexContainerSpaceBetween>
        </DragDropContext>
      </StyledDragDropContextContainer>
    );
  };

  const renderKanbanBoard = (): Nullable<JSX.Element> => {
    if (isEmpty(currentIssues) || !currentIssues) {
      return <StyledMessageContainer>{t('board.noCurrentIssues')}</StyledMessageContainer>;
    }

    return (
      <StyledDragDropContextContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <StyledFlexContainerSpaceBetween>
            {Object.values(ISSUE_STATUS).map((status: ISSUE_STATUS) => (
              <BoardColumn
                handleViewingIssue={handleViewingIssue}
                key={status}
                label={status}
                elements={currentIssues[status]}
              />
            ))}
          </StyledFlexContainerSpaceBetween>
        </DragDropContext>
      </StyledDragDropContextContainer>
    );
  };

  const renderContent = (): Nullable<JSX.Element> => {
    if (currentProject.methodology === PROJECT_METHODOLOGIES.AGILE) {
      return renderAgileBoard();
    }

    return renderKanbanBoard();
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <Heading5>{boardTitle}</Heading5>
      {renderContent()}
      <DialogComponent
        isOpen={issueDialogConfig.isOpen}
        handleClose={issueDialogConfig.handleClose}
      >
        <IssueDialog
          mode={issueDialogConfig.dialogMode}
          handleClose={issueDialogConfig.handleClose}
          handleSubmitting={issueDialogConfig.handleSubmit}
          issueId={issueDialogConfig.params.issueId}
          targetStatus={issueDialogConfig.params.targetStatus}
        />
      </DialogComponent>
    </VerticalPageWrapper>
  );
};
