import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { getDarkTheme, getLightTheme, GlobalStyles } from 'Themes';
import { MainLayout } from 'Modules/MainLayout';
import { IUserModel, UserModel } from 'Models/UserModel';

export const Main = (): JSX.Element => {
  const [isDarkTheme, setIsDarkTheme] = React.useState<boolean>(
    UserModel.currentUserValue.userSettings.darkMode
  );

  const [primaryColor, setPrimaryColor] = React.useState<string>(
    UserModel.currentUserValue.userSettings.interfaceColor
  );

  React.useEffect(() => {
    const subscription = UserModel.currentUser.subscribe(
      ({ userSettings: { darkMode, interfaceColor } }: IUserModel) => {
        setIsDarkTheme(darkMode);
        setPrimaryColor(interfaceColor);
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
