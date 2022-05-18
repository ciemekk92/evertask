import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DragDropContext } from 'react-beautiful-dnd';

import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { ISSUE_STATUS } from 'Shared/constants';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { capitalizeFirstLetter } from 'Utils/capitalizeFirstLetter';
import { actionCreators } from 'Stores/Issue';
import { BoardColumn } from './components';
import { StyledDragDropContextContainer, StyledListGrid } from './Board.styled';

export const Board = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { currentProjectValue } = CurrentProjectModel;

  const boardTitle = t('board.title', {
    methodology: capitalizeFirstLetter(currentProjectValue.methodology)
  });

  React.useEffect(() => {
    dispatch(actionCreators.getCurrentIssues(currentProjectValue.id));
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
    if (currentProjectValue.currentSprint) {
      return renderBoard();
    }

    return <p>{t('board.noCurrentSprint')}</p>;
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <Heading5>{boardTitle}</Heading5>
      {renderContent()}
    </VerticalPageWrapper>
  );
};
