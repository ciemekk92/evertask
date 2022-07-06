import React from 'react';
import { UserSmallCircle } from 'Shared/UserSmallCircle';
import { StyledNameLabel, StyledPanelContainer } from './OrganisationMemberPanel.styled';

interface Props {
  user: User.UserBasicEntity;
}

export const OrganisationMemberPanel = ({ user }: Props): JSX.Element => {
  const renderName = () => `${user.firstName} ${user.lastName}`;

  return (
    <StyledPanelContainer>
      <UserSmallCircle label={renderName()} imageSrc={user.avatar} />
      <StyledNameLabel>{renderName()}</StyledNameLabel>
    </StyledPanelContainer>
  );
};
