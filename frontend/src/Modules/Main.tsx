import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { getDarkTheme, getLightTheme, GlobalStyles } from 'Themes';
import { MainLayout } from 'Modules/MainLayout';
import { IUserModel, UserModel } from 'Models/UserModel';
import { useTranslation } from 'react-i18next';

export const Main = (): JSX.Element => {
  const { i18n } = useTranslation();
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(
    UserModel.currentUserValue.userSettings.darkMode
  );

  const [primaryColor, setPrimaryColor] = React.useState<string>(
    UserModel.currentUserValue.userSettings.interfaceColor
  );

  React.useEffect(() => {
    const subscription = UserModel.currentUser.subscribe(
      ({ userSettings: { darkMode, interfaceColor, interfaceLanguage } }: IUserModel) => {
        setIsDarkTheme(darkMode);
        setPrimaryColor(interfaceColor);
        i18n.changeLanguage(interfaceLanguage.toLowerCase());
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const muiTheme = createTheme({
    palette: {
      mode: isDarkTheme ? 'dark' : 'light'
    }
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={isDarkTheme ? getDarkTheme(primaryColor) : getLightTheme(primaryColor)}>
        <GlobalStyles themeType={isDarkTheme ? 'dark' : 'light'} />
        <MainLayout />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};
