import React from 'react';
import { StyledNameLabel, StyledPanelContainer } from './OrganisationMemberPanel.styled';

interface Props {
  user: User.UserEntity;
}

export const OrganisationMemberPanel = ({ user }: Props): JSX.Element => {
  const renderName = () => `${user.firstName} ${user.lastName} (${user.username})`;

  return (
    <StyledPanelContainer>
      <StyledNameLabel>{renderName()}</StyledNameLabel>
    </StyledPanelContainer>
  );
};
