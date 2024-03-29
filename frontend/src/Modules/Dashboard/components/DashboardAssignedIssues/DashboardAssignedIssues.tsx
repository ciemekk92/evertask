import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { IssuePanel } from 'Shared/IssuePanel';
import { Issue } from 'Types/Issue';
import { StyledHeaderRow, StyledSectionWrapper } from 'Modules/Dashboard/Dashboard.styled';
import { StyledEmptyListMessage } from './DashboardAssignedIssues.styled';

interface Props {
  data: Issue.IssueFullEntity[];
}

export const DashboardAssignedIssues = ({ data }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderNoIssuesMessage = () => (
    <StyledEmptyListMessage>{t('dashboard.assignedIssues.noIssues')}</StyledEmptyListMessage>
  );

  const renderIssues = () =>
    data.map((issue: Issue.IssueFullEntity) => <IssuePanel key={issue.id} issue={issue} />);

  const renderData = (): JSX.Element | JSX.Element[] =>
    data.length ? renderIssues() : renderNoIssuesMessage();

  return (
    <StyledSectionWrapper>
      <StyledHeaderRow>
        <Heading6>{t('dashboard.assignedIssues.title')}</Heading6>
      </StyledHeaderRow>
      {renderData()}
    </StyledSectionWrapper>
  );
};
