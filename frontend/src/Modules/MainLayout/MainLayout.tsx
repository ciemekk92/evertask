import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

import { history, Routes, CustomRouter } from 'Routes';
import { GlobalErrorBoundary } from 'Modules/GlobalErrorBoundary';
import { LandingPage } from 'Modules/LandingPage';
import { Login } from 'Modules/Auth';
import { AppHeader } from './components/AppHeader/AppHeader';
import { AppSidebar } from './components/AppSidebar/AppSidebar';
import { AppMainWindow } from './components/AppMainWindow/AppMainWindow';
import { HorizontalWrapper, LayoutWrapper } from './MainLayout.styled';

export const MainLayout = (): JSX.Element => {
  const handleLogin = () => {};
  const handleSignup = () => {};

  const renderLoggedInView = (
    <HorizontalWrapper>
      <AppSidebar />
      <AppMainWindow>
        <GlobalErrorBoundary>
          <ReactRoutes>
            <Routes />
          </ReactRoutes>
        </GlobalErrorBoundary>
      </AppMainWindow>
    </HorizontalWrapper>
  );

  const renderLoggedOutView = (): JSX.Element => (
    <GlobalErrorBoundary>
      <ReactRoutes>
        <Route path={'/'} element={<LandingPage />} />
        <Route path={'/login'} element={<Login />} />
      </ReactRoutes>
    </GlobalErrorBoundary>
  );

  return (
    <CustomRouter basename={'/'} history={history}>
      <LayoutWrapper>
        <AppHeader handleLogin={handleLogin} handleSignup={handleSignup} />
        {renderLoggedOutView()}
      </LayoutWrapper>
    </CustomRouter>
  );
};
