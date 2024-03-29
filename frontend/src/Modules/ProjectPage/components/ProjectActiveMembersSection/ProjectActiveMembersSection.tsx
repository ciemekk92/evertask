import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { UserPanel } from 'Shared/UserPanel';
import { User } from 'Types/User';

interface Props {
  membersData: User.UserEntity[];
}

export const ProjectActiveMembersSection = ({ membersData }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('projectPage.activeMembers')}</Heading6>
      </StyledSectionHeaderRow>
      {membersData.map((user: User.UserEntity) => (
        <UserPanel user={user} key={user.id} />
      ))}
    </StyledSectionWrapper>
  );
};
