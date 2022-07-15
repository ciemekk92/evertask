import React from 'react';
import { User } from 'Types/User';
import { StyledNameLabel, StyledPanelContainer } from './ProjectMemberPanel.styled';

interface Props {
  member: User.UserEntity;
}

export const ProjectMemberPanel = ({ member }: Props): JSX.Element => {
  const renderName = () => `${member.firstName} ${member.lastName} (${member.username})`;

  return (
    <StyledPanelContainer>
      <StyledNameLabel>{renderName()}</StyledNameLabel>
    </StyledPanelContainer>
  );
};
