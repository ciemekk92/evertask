import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actionCreators } from 'Stores/User';
import { StyledLink } from 'Shared/StyledLink';
import { IconButton } from 'Shared/Elements/Buttons';
import logoLight from 'Assets/logo_light.png';
import logoDark from 'Assets/logo_dark.png';

import { HeaderBody, LoginContainer } from './AppHeader.styled';
import { CurrentProjectField } from '../../../CurrentProjectField';

interface Props {
  isLoggedIn: boolean;
}

export const AppHeader = ({ isLoggedIn }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actionCreators.logout());
  };

  const renderMenuLoggedOut = () => (
    <React.Fragment>
      <StyledLink to="/login">
        <IconButton iconName="login">{t('general.login')}</IconButton>
      </StyledLink>
      <StyledLink to="/signup">
        <IconButton iconName="how_to_reg">{t('general.signup')}</IconButton>
      </StyledLink>
    </React.Fragment>
  );
  const renderMenuLoggedIn = () => (
    <React.Fragment>
      <CurrentProjectField />
      <IconButton onClick={handleLogout} iconName="logout">
        {t('general.logout')}
      </IconButton>
    </React.Fragment>
  );

  return (
    <HeaderBody>
      <StyledLink to="/">
        <img src={logoDark} alt="EverTask" />
      </StyledLink>
      <LoginContainer>{isLoggedIn ? renderMenuLoggedIn() : renderMenuLoggedOut()}</LoginContainer>
    </HeaderBody>
  );
};
