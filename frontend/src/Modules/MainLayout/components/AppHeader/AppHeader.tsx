import React from 'react';
import { useTranslation } from 'react-i18next';

import { StyledLink } from 'Shared/StyledLink';
import { IconButton } from 'Shared/Elements/Buttons';
import logoLight from 'Assets/logo_light.png';
import logoDark from 'Assets/logo_dark.png';

import { HeaderBody, LoginContainer } from './AppHeader.styled';

export const AppHeader = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <HeaderBody>
      <StyledLink to="/">
        <img src={logoDark} alt="EverTask" />
      </StyledLink>
      <LoginContainer>
        <StyledLink to="/login">
          <IconButton iconName="login">{t('general.login')}</IconButton>
        </StyledLink>
        <StyledLink to="/signup">
          <IconButton iconName="how_to_reg">{t('general.signup')}</IconButton>
        </StyledLink>
      </LoginContainer>
    </HeaderBody>
  );
};
