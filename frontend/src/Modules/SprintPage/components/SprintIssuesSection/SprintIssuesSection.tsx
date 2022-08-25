import React from 'react';
import { useTranslation } from 'react-i18next';
import { Issue } from 'Types/Issue';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { IssuePanel } from 'Shared/IssuePanel';

interface Props {
  issues: Issue.IssueFullEntity[];
}

export const SprintIssuesSection = ({ issues }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderIssuePanels = (): JSX.Element[] =>
    issues.map((issue: Issue.IssueFullEntity) => <IssuePanel key={issue.id} issue={issue} />);

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('sprintPage.issuesTitle')}</Heading6>
      </StyledSectionHeaderRow>
      {renderIssuePanels()}
    </StyledSectionWrapper>
  );
};
