import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { darkTheme, GlobalStyles, getLightTheme } from 'Themes';
import { MainLayout } from 'Modules/MainLayout';
import { UserModel } from 'Models/UserModel';

export const Main = (): JSX.Element => {
  const isDarkTheme = UserModel.currentUserValue.userSettings.darkMode;
  const primaryColor = UserModel.currentUserValue.userSettings.interfaceColor;

  const muiTheme = createTheme({
    palette: {
      mode: isDarkTheme ? 'dark' : 'light'
    }
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : getLightTheme(primaryColor)}>
        <GlobalStyles themeType={isDarkTheme ? 'dark' : 'light'} />
        <MainLayout />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};
