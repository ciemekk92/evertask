import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledVerticalContainer, VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { StyledLabel, StyledSprintWrapper } from './Backlog.styled';

export const Backlog = (): JSX.Element => {
  const { t } = useTranslation();

  const renderCurrentSprint = (): JSX.Element => {
    return (
      <StyledSprintWrapper>
        <StyledLabel>{t('backlog.currentSprint')}</StyledLabel>
      </StyledSprintWrapper>
    );
  };
  const renderNextSprints = () => <div />;
  const renderUnassignedIssues = () => <div />;

  return (
    <VerticalPageWrapper alignItems="unset">
      <Heading5>{t('backlog.title')}</Heading5>
      <StyledVerticalContainer>
        {renderCurrentSprint()}
        {renderNextSprints()}
        {renderUnassignedIssues()}
      </StyledVerticalContainer>
    </VerticalPageWrapper>
  );
};
