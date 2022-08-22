import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from 'Stores/User';
import { StyledLink } from 'Shared/StyledLink';
import { IconButton } from 'Shared/Elements/Buttons';
import { DROPDOWN_MENU_POSITION, DropdownMenu } from 'Shared/Elements/DropdownMenu';
import { CurrentProjectField } from 'Modules/CurrentProjectField';
import { HeaderBody, LoginContainer } from './AppHeader.styled';
import logoDark from 'Assets/logo_dark.png';
import logoLight from 'Assets/logo_light.png';
import { UserModel } from 'Models/UserModel';

export const AppHeader = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = UserModel.currentUserValue;

  const handleLogout = (): void => {
    dispatch(actionCreators.logout());
  };

  const dropdownOptions: Util.MenuOptionWithOnClick[] = [
    {
      label: t('general.profile'),
      onClick: () => navigate('/profile')
    },
    {
      label: t('general.logout'),
      onClick: handleLogout
    }
  ];

  const renderMenuLoggedOut = (): JSX.Element => (
    <React.Fragment>
      <StyledLink to="/login">
        <IconButton iconName="login">{t('general.login')}</IconButton>
      </StyledLink>
      <StyledLink to="/signup">
        <IconButton iconName="how_to_reg">{t('general.signup')}</IconButton>
      </StyledLink>
    </React.Fragment>
  );

  const renderMenuLoggedIn = (): JSX.Element => (
    <React.Fragment>
      <CurrentProjectField />
      <DropdownMenu
        options={dropdownOptions}
        position={DROPDOWN_MENU_POSITION.BOTTOM_LEFT}
        iconName="person"
      />
    </React.Fragment>
  );

  return (
    <HeaderBody>
      <StyledLink to="/">
        <img src={currentUser.userSettings.darkMode ? logoDark : logoLight} alt="EverTask" />
      </StyledLink>
      <LoginContainer>
        {currentUser.id ? renderMenuLoggedIn() : renderMenuLoggedOut()}
      </LoginContainer>
    </HeaderBody>
  );
};
