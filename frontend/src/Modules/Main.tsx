import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { darkTheme, GlobalStyles, lightTheme } from 'Themes';
import { MainLayout } from 'Modules/MainLayout';

export const Main = (): JSX.Element => {
  const [theme, setTheme] = React.useState<UiTheme>('dark');
  const muiTheme = createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light'
    }
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles themeType={theme} />
        <MainLayout />
      </ThemeProvider>
    </MuiThemeProvider>
  );
};
