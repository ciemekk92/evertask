import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { getDarkTheme, getLightTheme, GlobalStyles } from 'Themes';
import { MainLayout } from 'Modules/MainLayout';
import { IUserModel, UserModel } from 'Models/UserModel';
import { LoadingModel } from 'Models/LoadingModel';
import { LoadingContainer } from 'Shared/LoadingContainer';

export const Main = (): JSX.Element => {
  const { i18n } = useTranslation();
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(
    UserModel.currentUserValue.userSettings.darkMode
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(LoadingModel.activeCallsValue !== 0);
  const [primaryColor, setPrimaryColor] = React.useState<string>(
    UserModel.currentUserValue.userSettings.interfaceColor
  );

  React.useEffect(() => {
    const userSubscription = UserModel.currentUser.subscribe(
      ({ userSettings: { darkMode, interfaceColor, interfaceLanguage } }: IUserModel) => {
        setIsDarkTheme(darkMode);
        setPrimaryColor(interfaceColor);
        i18n.changeLanguage(interfaceLanguage.toLowerCase());
      }
    );

    const loadingSubscription = LoadingModel.activeCalls.subscribe((value) =>
      setIsLoading(value !== 0)
    );

    return () => {
      userSubscription.unsubscribe();
      loadingSubscription.unsubscribe();
    };
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
        <LoadingContainer isLoading={isLoading} />
        <MainLayout />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};
