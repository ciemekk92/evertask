import React from 'react';
import { Heading6 } from 'Shared/Typography';
import { Issue } from 'Types/Issue';
import { StyledSectionWrapper } from '../../Dashboard.styled';
import { useTranslation } from 'react-i18next';

interface Props {
  data: Issue[];
}

export const DashboardAssignedIssues = ({ data }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledSectionWrapper>
      <Heading6>{t('dashboard.assignedIssues.title')}</Heading6>
      {data.map((issue) => (
        <p>{issue.title}</p>
      ))}
    </StyledSectionWrapper>
  );
};
