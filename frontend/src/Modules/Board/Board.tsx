import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DragDropContext } from 'react-beautiful-dnd';

import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { ISSUE_STATUS, PROJECT_METHODOLOGIES } from 'Shared/constants';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { capitalizeFirstLetter } from 'Utils/capitalizeFirstLetter';
import { Project } from 'Types/Project';
import { actionCreators } from 'Stores/Issue';
import { BoardColumn } from './components';
import {
  StyledDragDropContextContainer,
  StyledListGrid,
  StyledMessageContainer
} from './Board.styled';

export const Board = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentProject, setCurrentProject] = React.useState<Project.ProjectEntity>({
    id: '',
    createdAt: '',
    updatedAt: null,
    lastUpdatedAt: '',
    name: '',
    code: '',
    methodology: PROJECT_METHODOLOGIES.KANBAN,
    description: '',
    activeSprint: null
  });

  React.useEffect(() => {
    CurrentProjectModel.currentProject.subscribe((project: Project.ProjectEntity) => {
      setCurrentProject(project);
    });
  }, [CurrentProjectModel.currentProject]);

  const boardTitle = t('board.title', {
    methodology: capitalizeFirstLetter(currentProject.methodology)
  });

  React.useEffect(() => {
    dispatch(actionCreators.getCurrentIssues(currentProject.id));
  }, []);

  const onDragEnd = () => {};

  const renderBoard = (): JSX.Element => {
    return (
      <StyledDragDropContextContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <StyledListGrid>
            {Object.values(ISSUE_STATUS).map((status: string) => (
              <BoardColumn key={status} label={status} elements={[]} />
            ))}
          </StyledListGrid>
        </DragDropContext>
      </StyledDragDropContextContainer>
    );
  };

  const renderContent = (): JSX.Element => {
    if (currentProject.activeSprint) {
      return renderBoard();
    }

    return <StyledMessageContainer>{t('board.noCurrentSprint')}</StyledMessageContainer>;
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <Heading5>{boardTitle}</Heading5>
      {renderContent()}
    </VerticalPageWrapper>
  );
};
