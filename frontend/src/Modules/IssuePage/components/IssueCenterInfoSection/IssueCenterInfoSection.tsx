import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { StyledField, StyledFieldLabel } from '../Shared.styled';
import { StyledColumn, StyledColumnContainer } from './IssueCenterInfoSection.styled';
import { IssueTypeIcon } from '../../../../Shared/IssueTypeIcon';
import { Issue } from '../../../../Types/Issue';
import { StatusBadge } from '../../../../Shared/StatusBadge';
import { PriorityBadge } from '../../../../Shared/PriorityBadge';
import { PROJECT_METHODOLOGIES } from '../../../../Shared/constants';
import { StoryPointBadge } from '../../../../Shared/StoryPointBadge';

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
      <StyledColumnContainer>
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
        </StyledColumn>
      </StyledColumnContainer>
    </StyledSectionWrapper>
  );
};
