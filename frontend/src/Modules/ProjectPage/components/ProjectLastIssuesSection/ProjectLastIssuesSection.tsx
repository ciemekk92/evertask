import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { IssuePanel } from 'Shared/IssuePanel';
import { Issue } from 'Types/Issue';

interface Props {
  issuesData: Issue.IssueEntity[];
}

export const ProjectLastIssuesSection = ({ issuesData }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderLastIssues = (): JSX.Element | JSX.Element[] => {
    if (!issuesData.length) {
      return <p>{t('projectPage.noIssues')}</p>;
    }

    return issuesData.map((issue: Issue.IssueEntity) => (
      <IssuePanel key={issue.id} issue={issue} />
    ));
  };

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('projectPage.lastIssues')}</Heading6>
      </StyledSectionHeaderRow>
      {renderLastIssues()}
    </StyledSectionWrapper>
  );
};
