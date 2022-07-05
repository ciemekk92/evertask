import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Container, useLoading } from 'Hooks/useLoading';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { ISSUE_DIALOG_MODES, IssueDialog } from 'Modules/IssueDialog';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { ISSUE_STATUS } from 'Shared/constants';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { capitalizeFirstLetter } from 'Utils/capitalizeFirstLetter';
import { Project } from 'Types/Project';
import { Issue } from 'Types/Issue';
import { ApplicationState } from 'Stores/store';
import { actionCreators } from 'Stores/Issue';
import { Api } from 'Utils/Api';
import { BoardColumn } from './components';
import {
  StyledDragDropContextContainer,
  StyledListGrid,
  StyledMessageContainer
} from './Board.styled';

export const Board = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const issueDialogConfig = useDialog<ISSUE_DIALOG_MODES>(ISSUE_DIALOG_MODES.ADD);

  const currentIssues: Nullable<PartialRecord<ISSUE_STATUS, Issue.IssueEntity[]>> = useSelector(
    (state: ApplicationState) => (state.issue ? state.issue.boardIssues : null),
    shallowEqual
  );

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
    methodology: capitalizeFirstLetter(CurrentProjectModel.currentProjectValue.methodology)
  });

  const onDragEnd = async (result: DropResult): Promise<void> => {
    if (currentIssues) {
      startLoading();

      if (!result.destination || result.source.droppableId === result.destination.droppableId) {
        stopLoading();
        return;
      }

      const targetStatus = result.destination.droppableId as ISSUE_STATUS;
      const sourceStatus = result.source.droppableId as ISSUE_STATUS;

      if (targetStatus === ISSUE_STATUS.CODE_REVIEW) {
        stopLoading();

        const dialogResult = await issueDialogConfig.handleOpen(ISSUE_DIALOG_MODES.EDIT, {
          issueId: result.draggableId,
          targetStatus
        });

        if (!dialogResult) {
          return;
        } else {
          dispatch(actionCreators.getCurrentIssues(CurrentProjectModel.currentProjectValue.id));
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
          dispatch(actionCreators.getCurrentIssues(CurrentProjectModel.currentProjectValue.id));
        }
      }

      stopLoading();
    }
  };

  const renderBoard = (): Nullable<JSX.Element> => {
    if (!currentIssues) {
      return null;
    }

    return (
      <StyledDragDropContextContainer>
        <Container isLoading={isLoading} />
        <DragDropContext onDragEnd={onDragEnd}>
          <StyledListGrid>
            {Object.values(ISSUE_STATUS).map((status: ISSUE_STATUS) => (
              <BoardColumn key={status} label={status} elements={currentIssues[status]} />
            ))}
          </StyledListGrid>
        </DragDropContext>
      </StyledDragDropContextContainer>
    );
  };

  const renderContent = (): Nullable<JSX.Element> => {
    if (CurrentProjectModel.currentProjectValue.activeSprint) {
      return renderBoard();
    }

    return <StyledMessageContainer>{t('board.noCurrentSprint')}</StyledMessageContainer>;
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
