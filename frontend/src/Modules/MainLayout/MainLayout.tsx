import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';

import { history, Routes } from 'Routes';
import { GlobalErrorBoundary } from 'Modules/GlobalErrorBoundary';
import { LandingPage } from 'Modules/LandingPage';
import { AppHeader } from './components/AppHeader/AppHeader';
import { AppSidebar } from './components/AppSidebar/AppSidebar';
import { AppMainWindow } from './components/AppMainWindow/AppMainWindow';
import { HorizontalWrapper, LayoutWrapper } from './MainLayout.styled';
import { CustomRouter } from '../../Routes/CustomRouter';

export const MainLayout = (): JSX.Element => {
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
      </ReactRoutes>
    </GlobalErrorBoundary>
  );

  return (
    <CustomRouter basename={'/'} history={history}>
      <LayoutWrapper>
        <AppHeader />
        {renderLoggedOutView()}
      </LayoutWrapper>
    </CustomRouter>
  );
};
