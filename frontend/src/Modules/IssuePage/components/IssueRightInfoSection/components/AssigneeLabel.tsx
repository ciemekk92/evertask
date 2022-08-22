import React from 'react';
import styled from 'styled-components';
import { UserCircle } from 'Shared/UserCircle';
import { StyledFlexContainerAlignCenter, StyledTextEllipsis } from 'Shared/SharedStyles.styled';
import { User } from 'Types/User';
import { useTranslation } from 'react-i18next';

interface Props {
  user: Nullable<User.UserEntity>;
}

const StyledLabelContainer = styled(StyledFlexContainerAlignCenter)`
  & > p {
    margin-left: 1.2rem;
    ${StyledTextEllipsis};
  }
`;

export const AssigneeLabel = ({ user }: Props): JSX.Element => {
  const { t } = useTranslation();
  const fullName = user ? `${user.firstName} ${user.lastName}` : t('issuePage.right.unassigned');

  return (
    <StyledLabelContainer>
      <UserCircle imageSrc={user ? user.avatar : null} label={fullName} />
      <p>{fullName}</p>
    </StyledLabelContainer>
  );
};
