import React from 'react';
import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';

import { Routes } from 'Routes';
import { GlobalErrorBoundary } from 'Modules/GlobalErrorBoundary';
import { LandingPage } from 'Modules/LandingPage';
import { AppHeader } from './components/AppHeader/AppHeader';
import { AppSidebar } from './components/AppSidebar/AppSidebar';
import { AppMainWindow } from './components/AppMainWindow/AppMainWindow';
import { HorizontalWrapper, LayoutWrapper } from './MainLayout.styled';

export const MainLayout = (): JSX.Element => {
  const renderLoggedInView = (
    <BrowserRouter basename={'/'}>
      <ReactRoutes>
        <Route
          children={() => (
            <LayoutWrapper>
              <AppHeader />
              <HorizontalWrapper>
                <AppSidebar />
                <AppMainWindow>
                  <GlobalErrorBoundary>
                    <Routes />
                  </GlobalErrorBoundary>
                </AppMainWindow>
              </HorizontalWrapper>
            </LayoutWrapper>
          )}
        />
      </ReactRoutes>
    </BrowserRouter>
  );

  const renderLoggedOutView = (
    <BrowserRouter basename={'/'}>
      <ReactRoutes>
        <Route
          children={() => (
            <LayoutWrapper>
              <AppHeader />
              <GlobalErrorBoundary>
                <Route path={'/'} element={<LandingPage />} />
              </GlobalErrorBoundary>
            </LayoutWrapper>
          )}
        />
      </ReactRoutes>
    </BrowserRouter>
  );

  return renderLoggedOutView;
};
