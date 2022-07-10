import React from 'react';
import { UserCircle } from 'Shared/UserCircle';
import { StyledNameLabel, StyledPanelContainer } from './OrganisationMemberPanel.styled';

interface Props {
  user: User.UserBasicEntity;
}

export const OrganisationMemberPanel = ({ user }: Props): JSX.Element => {
  const renderName = () => `${user.firstName} ${user.lastName}`;

  return (
    <StyledPanelContainer>
      <UserCircle label={renderName()} imageSrc={user.avatar} />
      <StyledNameLabel>{renderName()}</StyledNameLabel>
    </StyledPanelContainer>
  );
};
