import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { UserCircle } from 'Shared/UserCircle';
import { Issue } from 'Types/Issue';
import { User } from 'Types/User';
import { formatDateForDisplayWithTime } from 'Utils/formatDate';
import { StyledField, StyledFieldLabel } from '../Shared.styled';
import { StyledUserContainer, StyledUserName } from './IssueRightInfoSection.styled';

interface Props {
  issue: Issue.IssueFullEntity;
}

export const IssueRightInfoSection = ({ issue }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderUserField = (
    user: Nullable<User.UserBasicEntity>,
    fieldKey: 'assignee' | 'reporter'
  ): JSX.Element => {
    const fullName = user ? `${user.firstName} ${user.lastName}` : t('issuePage.right.unassigned');

    return (
      <StyledField>
        <StyledFieldLabel>{t(`issuePage.right.${fieldKey}`)}</StyledFieldLabel>
        <StyledUserContainer>
          <UserCircle imageSrc={user ? user.avatar : null} label={fullName} />
          <StyledUserName>{fullName}</StyledUserName>
        </StyledUserContainer>
      </StyledField>
    );
  };

  const renderDateField = (
    date: Nullable<string>,
    fieldKey: 'createdAt' | 'updatedAt'
  ): Nullable<JSX.Element> => {
    if (!date) {
      return null;
    }

    return (
      <StyledField>
        <StyledFieldLabel>{t(`issuePage.right.${fieldKey}`)}</StyledFieldLabel>
        <p>{formatDateForDisplayWithTime(date)}</p>
      </StyledField>
    );
  };

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('issuePage.right.title')}</Heading6>
      </StyledSectionHeaderRow>
      {renderUserField(issue.assignee, 'assignee')}
      {renderUserField(issue.reporter, 'reporter')}
      {renderDateField(issue.createdAt, 'createdAt')}
      {renderDateField(issue.updatedAt, 'updatedAt')}
    </StyledSectionWrapper>
  );
};
