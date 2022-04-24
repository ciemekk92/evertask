import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { User } from 'Types/User';
import { MemberPanel } from '../';
import { StyledWrapper, StyledHeaderRow } from '../../OrganisationPage.styled';

interface Props {
  membersData: User[];
}

export const MembersSection = ({ membersData }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <StyledHeaderRow>
        <Heading6>{t('organisationPage.members')}</Heading6>
      </StyledHeaderRow>
      {membersData.map((user: User) => (
        <MemberPanel key={user.id} user={user} />
      ))}
    </StyledWrapper>
  );
};
