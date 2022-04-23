import React from 'react';
import { User } from 'Types/User';
import { StyledNameLabel, StyledPanelContainer } from './MemberPanel.styled';

interface Props {
  user: User;
}

export const MemberPanel = ({ user }: Props): JSX.Element => {
  const renderName = () => `${user.firstName} ${user.lastName} (${user.username})`;

  return (
    <StyledPanelContainer>
      <StyledNameLabel>{renderName()}</StyledNameLabel>
    </StyledPanelContainer>
  );
};
