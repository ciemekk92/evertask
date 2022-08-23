import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton } from 'Shared/Elements/Buttons';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { StyledFlexColumnContainer } from 'Shared/SharedStyles.styled';
import { Issue } from 'Types/Issue';
import { SubtaskPanel } from './components';
import { StyledMessage } from './IssueSubtasksSection.styled';

interface Props {
  subtasks: Issue.IssueFullEntity[];
  handleOpeningAddSubtask: () => Promise<void>;
}

export const IssueSubtasksSection = ({ subtasks, handleOpeningAddSubtask }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderSubtasks = (): JSX.Element | JSX.Element[] => {
    if (subtasks.length) {
      return subtasks.map((subtask: Issue.IssueFullEntity) => (
        <SubtaskPanel subtask={subtask} key={subtask.id} />
      ));
    }

    return <StyledMessage>{t('issuePage.subtasks.noSubtasks')}</StyledMessage>;
  };

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('issuePage.subtasks.title')}</Heading6>
        <IconButton iconName="add" onClick={handleOpeningAddSubtask}>
          {t('issuePage.subtasks.addSubtask')}
        </IconButton>
      </StyledSectionHeaderRow>
      <StyledFlexColumnContainer>{renderSubtasks()}</StyledFlexColumnContainer>
    </StyledSectionWrapper>
  );
};
