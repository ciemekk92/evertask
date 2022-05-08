import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { OrganisationMemberPanel } from '../';

interface Props {
  membersData: User.UserEntity[];
}

export const OrganisationMembersSection = ({ membersData }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('organisationPage.members')}</Heading6>
      </StyledSectionHeaderRow>
      {membersData.map((user: User.UserEntity) => (
        <OrganisationMemberPanel key={user.id} user={user} />
      ))}
    </StyledSectionWrapper>
  );
};
