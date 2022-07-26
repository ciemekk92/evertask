import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { IssueTypeIcon } from 'Shared/IssueTypeIcon';
import { PriorityBadge } from 'Shared/PriorityBadge';
import { StatusBadge } from 'Shared/StatusBadge';
import { StoryPointBadge } from 'Shared/StoryPointBadge';
import { PROJECT_METHODOLOGIES } from 'Shared/constants';
import { StyledFlexContainerSpaceBetween } from 'Shared/SharedStyles.styled';
import { Issue } from 'Types/Issue';
import { StyledField, StyledFieldLabel } from '../Shared.styled';
import { StyledColumn } from './IssueCenterInfoSection.styled';

interface Props {
  issue: Issue.IssueFullEntity;
}

export const IssueCenterInfoSection = ({ issue }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('issuePage.center.title')}</Heading6>
      </StyledSectionHeaderRow>
      <StyledFlexContainerSpaceBetween>
        <StyledColumn>
          <StyledField>
            <StyledFieldLabel>{t('issuePage.center.type')}</StyledFieldLabel>
            <p>
              <IssueTypeIcon type={issue.type} />
              {t(`general.issueType.${issue.type}`)}
            </p>
          </StyledField>
          <StyledField>
            <StyledFieldLabel>{t('issuePage.center.status')}</StyledFieldLabel>
            <StatusBadge status={issue.status} />
          </StyledField>
          {issue.project.methodology === PROJECT_METHODOLOGIES.AGILE && (
            <StyledField>
              <StyledFieldLabel>{t('issuePage.center.sprint')}</StyledFieldLabel>
              <p>{issue.sprint ? `Sprint ${issue.sprint.ordinal}` : '-'}</p>
            </StyledField>
          )}
        </StyledColumn>
        <StyledColumn>
          <StyledField>
            <StyledFieldLabel>{t('issuePage.center.priority')}</StyledFieldLabel>
            <PriorityBadge priority={issue.priority} />
          </StyledField>
          {issue.estimateStoryPoints && (
            <StyledField>
              <StyledFieldLabel>{t('issuePage.center.storyPoints')}</StyledFieldLabel>
              <StoryPointBadge value={issue.estimateStoryPoints} />
            </StyledField>
          )}
          {issue.pullRequestUrl && (
            <StyledField>
              <StyledFieldLabel>{t('issuePage.center.pullRequestUrl')}</StyledFieldLabel>
              <a href={issue.pullRequestUrl} target="_blank" rel="noreferrer">
                {issue.pullRequestUrl}
              </a>
            </StyledField>
          )}
        </StyledColumn>
      </StyledFlexContainerSpaceBetween>
    </StyledSectionWrapper>
  );
};
