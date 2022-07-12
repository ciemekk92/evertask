import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { User } from 'Types/User';
import { ProjectMemberPanel } from '..';

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
        <ProjectMemberPanel key={user.id} member={user} />
      ))}
    </StyledSectionWrapper>
  );
};
