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

interface Props {
  isLoggedIn: boolean;
}

export const AppHeader = ({ isLoggedIn }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(actionCreators.logout());
  };

  const dropdownOptions: Util.MenuOption[] = [
    {
      label: t('general.profile'),
      onClick: () => navigate('/profile')
    },
    {
      label: t('general.logout'),
      onClick: handleLogout
    }
  ];

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
        <img src={logoDark} alt="EverTask" />
      </StyledLink>
      <LoginContainer>{isLoggedIn ? renderMenuLoggedIn() : renderMenuLoggedOut()}</LoginContainer>
    </HeaderBody>
  );
};
