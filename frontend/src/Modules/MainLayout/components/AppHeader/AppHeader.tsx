import React from 'react';
import { StyledLink } from 'Shared/StyledLink';
import logoLight from 'Assets/logo_light.png';
import logoDark from 'Assets/logo_dark.png';

import { HeaderBody } from './AppHeader.styled';

export const AppHeader = (): JSX.Element => {
  return (
    <HeaderBody>
      <StyledLink to="/" replace>
        <img src={logoDark} alt="EverTask" />
      </StyledLink>
      <div style={{ display: 'flex', marginLeft: 'auto' }}>
        <p>Profil</p>
        <p>Wiadomosci</p>
        <p>Powiadomienia</p>
      </div>
    </HeaderBody>
  );
};
