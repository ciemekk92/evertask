import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { UserPanel } from 'Shared/UserPanel';
import { User } from 'Types/User';

interface Props {
  activeMembers: User.UserEntity[];
}

export const SprintActiveMembersSection = ({ activeMembers }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('sprintPage.membersTitle')}</Heading6>
      </StyledSectionHeaderRow>
      {activeMembers.map((user: User.UserEntity) => (
        <UserPanel key={user.id} user={user} />
      ))}
    </StyledSectionWrapper>
  );
};
