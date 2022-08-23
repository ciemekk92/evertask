import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Droppable } from 'react-beautiful-dnd';
import { ISSUE_STATUS, ISSUE_TYPE } from 'Shared/constants';
import { ApplicationState } from 'Stores/store';
import { Issue } from 'Types/Issue';
import { isDefined } from 'Utils/isDefined';
import { BoardIssueTile } from '..';
import {
  StyledColumnContainer,
  StyledColumnHeader,
  StyledDroppableWrapper
} from './BoardColumn.styled';

interface Props {
  label: ISSUE_STATUS;
  elements?: Issue.IssueFullEntity[];
  handleViewingIssue: (id: Id) => VoidFunctionNoArgs;
}

export const BoardColumn = ({ label, elements, handleViewingIssue }: Props): JSX.Element => {
  const { t } = useTranslation();

  const currentIssues: Nullable<PartialRecord<ISSUE_STATUS, Issue.IssueFullEntity[]>> = useSelector(
    (state: ApplicationState) => (state.issue ? state.issue.boardIssues : null),
    shallowEqual
  );

  const getCurrentIssueIndex = (initialIndex: number, issues: Issue.IssueFullEntity[]): number => {
    let currentIndex;

    if (initialIndex === 0 || initialIndex - issues[initialIndex - 1].subtasks.length < 0) {
      currentIndex = 0;
    } else {
      currentIndex = initialIndex - issues[initialIndex - 1].subtasks.length;
    }

    return currentIndex;
  };

  const mapIssues = (issues: Issue.IssueFullEntity[]): JSX.Element[] => {
    return issues.map((issue, index) => {
      return (
        <React.Fragment key={issue.id}>
          <BoardIssueTile
            issue={issue}
            index={getCurrentIssueIndex(index, issues)}
            isSubtask={issue.type === ISSUE_TYPE.SUBTASK}
            isDragDisabled={label === ISSUE_STATUS.ACCEPTED}
            handleViewingIssue={handleViewingIssue}
          />
          {issue.subtasks
            .filter((el) => isDefined(elements!.find((element) => element.id === el.id)))
            .map((el, subIndex) => (
              <BoardIssueTile
                key={el.id}
                issue={el}
                index={index + subIndex + 1}
                isSubtask={el.type === ISSUE_TYPE.SUBTASK}
                isDragDisabled={label === ISSUE_STATUS.ACCEPTED}
                handleViewingIssue={handleViewingIssue}
              />
            ))}
        </React.Fragment>
      );
    });
  };

  const renderTilesWithSubtasks = (): JSX.Element[] => {
    if (!elements) return [];

    const filteredIssuesWithoutSubtasks = elements.filter((el) => el.type !== ISSUE_TYPE.SUBTASK);

    const subtasksWithoutParents = elements.filter(
      (el) =>
        el.type === ISSUE_TYPE.SUBTASK &&
        !isDefined(elements.find((issue) => issue.id === el.parentId))
    );

    return [
      ...mapIssues(filteredIssuesWithoutSubtasks),
      ...subtasksWithoutParents.map((issue, index) => {
        const currentIndex = index + filteredIssuesWithoutSubtasks.length;
        const parent = currentIssues
          ? ([] as Issue.IssueFullEntity[])
              .concat(...Object.values(currentIssues))
              .find((el) => el.id === issue.parentId)
          : undefined;

        return (
          <BoardIssueTile
            key={issue.id}
            issue={issue}
            index={currentIndex}
            parent={parent}
            isSubtask={issue.type === ISSUE_TYPE.SUBTASK}
            isDragDisabled={label === ISSUE_STATUS.ACCEPTED}
            handleViewingIssue={handleViewingIssue}
          />
        );
      })
    ];
  };

  return (
    <StyledColumnContainer>
      <StyledColumnHeader>{t(`general.issueStatus.${label}`).toUpperCase()}</StyledColumnHeader>
      <Droppable droppableId={label}>
        {(provided) => (
          <StyledDroppableWrapper {...provided.droppableProps} ref={provided.innerRef}>
            {renderTilesWithSubtasks()}
            {provided.placeholder}
          </StyledDroppableWrapper>
        )}
      </Droppable>
    </StyledColumnContainer>
  );
};
