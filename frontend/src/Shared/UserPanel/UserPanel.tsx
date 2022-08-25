import React from 'react';
import { UserCircle } from 'Shared/UserCircle';
import { User } from 'Types/User';
import { StyledNameLabel, StyledPanelContainer } from './UserPanel.styled';

interface Props {
  user: User.UserBasicEntity | User.UserEntity;
}

export const UserPanel = ({ user }: Props): JSX.Element => {
  const renderName = () => `${user.firstName} ${user.lastName}`;

  return (
    <StyledPanelContainer>
      <UserCircle label={renderName()} imageSrc={user.avatar} />
      <StyledNameLabel>{renderName()}</StyledNameLabel>
    </StyledPanelContainer>
  );
};
