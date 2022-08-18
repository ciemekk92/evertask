import React from 'react';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { DROPDOWN_MENU_POSITION, DropdownMenu } from 'Shared/Elements/DropdownMenu';
import { IssueTypeIcon } from 'Shared/IssueTypeIcon';
import { PriorityBadge } from 'Shared/PriorityBadge';
import { StatusBadge } from 'Shared/StatusBadge';
import { StoryPointBadge } from 'Shared/StoryPointBadge';
import { Issue } from 'Types/Issue';
import {
  StyledIconsContainer,
  StyledIssueContainer,
  StyledIssueTitle
} from '../BacklogMainPanel/BacklogMainPanel.styled';

interface Props {
  issue: Issue.IssueEntity;
  dropdownOptions: Util.MenuOption[];
}

export const BacklogPanel = ({ issue, dropdownOptions }: Props): JSX.Element => {
  const currentProject = CurrentProjectModel.currentProjectValue;

  return (
    <StyledIssueContainer>
      <IssueTypeIcon type={issue.type} />
      <PriorityBadge priority={issue.priority} />
      <StyledIssueTitle>
        <strong>{`${currentProject.code}-${issue.key}`}</strong>
        {issue.title}
      </StyledIssueTitle>
      <StyledIconsContainer>
        <StoryPointBadge value={issue.estimateStoryPoints} />
        <StatusBadge status={issue.status} />
        <DropdownMenu options={dropdownOptions} position={DROPDOWN_MENU_POSITION.BOTTOM_LEFT} />
      </StyledIconsContainer>
    </StyledIssueContainer>
  );
};