import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyles, lightTheme } from 'Themes';
import { MainLayout } from 'Modules/MainLayout';

export const Main = (): JSX.Element => {
  const [theme, setTheme] = React.useState<UiTheme>('dark');

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles themeType={theme} />
      <MainLayout />
    </ThemeProvider>
  );
};
