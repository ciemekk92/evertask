import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';

import { CustomRouter, history } from 'Routes';
import { GlobalErrorBoundary } from 'Modules/GlobalErrorBoundary';
import { LandingPage } from 'Modules/LandingPage';
import { Login, Signup, SignupConfirmation, SuccessNotification } from 'Modules/Auth';
import { NOTIFICATION_TYPES } from 'Shared/constants';
import { AppHeader } from './components/AppHeader/AppHeader';
import { AppSidebar } from './components/AppSidebar/AppSidebar';
import { AppMainWindow } from './components/AppMainWindow/AppMainWindow';
import { HorizontalWrapper, LayoutWrapper } from './MainLayout.styled';
import { User, UserModel } from '../../Models/UserModel';
import { HomePage } from '../HomePage';

export const MainLayout = (): JSX.Element => {
  const [currentUser, setCurrentUser] = React.useState<User>({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    accessToken: ''
  });

  React.useEffect(() => {
    UserModel.currentUser.subscribe((user: User) => {
      setCurrentUser(user);
    });
  });

  const renderLoggedInView = (): JSX.Element => (
    <HorizontalWrapper>
      <AppSidebar />
      <AppMainWindow>
        <GlobalErrorBoundary>
          <ReactRoutes>
            <Route path={'/'} element={<HomePage />} />
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
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/signup_confirmation'} element={<SignupConfirmation />} />
        <Route
          path={'/signup_success'}
          element={<SuccessNotification type={NOTIFICATION_TYPES.SIGNUP} />}
        />
      </ReactRoutes>
    </GlobalErrorBoundary>
  );

  return (
    <CustomRouter basename={'/'} history={history}>
      <LayoutWrapper>
        <AppHeader />
        {currentUser.accessToken ? renderLoggedInView() : renderLoggedOutView()}
      </LayoutWrapper>
    </CustomRouter>
  );
};
