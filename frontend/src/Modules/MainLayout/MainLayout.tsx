import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CustomRouter, history } from 'Routes';
import { GlobalErrorBoundary } from 'Modules/GlobalErrorBoundary';
import { LandingPage } from 'Modules/LandingPage';
import {
  Login,
  Signup,
  SignupConfirmation,
  SuccessNotification,
  MultifactorAuth
} from 'Modules/Auth';
import { Dashboard } from 'Modules/Dashboard';
import { ProjectPage } from 'Modules/ProjectPage';
import { Board } from 'Modules/Board';
import { Backlog } from 'Modules/Backlog';
import { IssuePage } from 'Modules/IssuePage';
import { UnassignedUserPage } from 'Modules/UnassignedUserPage';
import { OrganisationPage } from 'Modules/OrganisationPage';
import { SprintPage } from 'Modules/SprintPage';
import { Statistics } from 'Modules/Statistics';
import { UserProfile } from 'Modules/UserProfile';
import { UserModel } from 'Models/UserModel';
import { StyledFlexColumnContainer, StyledFlexContainer } from 'Shared/SharedStyles.styled';
import { NOTIFICATION_TYPES } from 'Shared/constants';
import { actionCreators } from 'Stores/User';
import { PermissionCheck } from 'Utils/PermissionCheck';
import { AppHeader, AppMainWindow, AppSidebar } from './components';

export const MainLayout = (): JSX.Element => {
  const currentUser = UserModel.currentUserValue;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!currentUser.accessToken) {
      dispatch(actionCreators.refresh());
    }
  }, [dispatch, currentUser.accessToken]);

  const renderForAssignedUser = (): JSX.Element => (
    <React.Fragment>
      <AppSidebar />
      <AppMainWindow>
        <GlobalErrorBoundary>
          <ReactRoutes>
            <Route path={'/'} element={<Dashboard />} />
            <Route path={'/project/:id'} element={<ProjectPage />} />
            <Route path={'/sprint/:id'} element={<SprintPage />} />
            <Route path={'/issue/:id'} element={<IssuePage />} />
            <Route path={'/board'} element={<Board />} />
            <Route path={'/backlog'} element={<Backlog />} />
            <Route path={'/organisation'} element={<OrganisationPage />} />
            <Route path={'/statistics'} element={<Statistics />} />
            <Route path={'/profile'} element={<UserProfile />} />
          </ReactRoutes>
        </GlobalErrorBoundary>
      </AppMainWindow>
    </React.Fragment>
  );

  const renderForUnassignedUser = (): JSX.Element => (
    <AppMainWindow>
      <GlobalErrorBoundary>
        <ReactRoutes>
          <Route path={'/'} element={<UnassignedUserPage />} />
          <Route path={'/profile'} element={<UserProfile />} />
        </ReactRoutes>
      </GlobalErrorBoundary>
    </AppMainWindow>
  );

  const renderLoggedInView = (): JSX.Element => (
    <StyledFlexContainer>
      {PermissionCheck.isUnassignedUser ? renderForUnassignedUser() : renderForAssignedUser()}
    </StyledFlexContainer>
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
        <Route path={'/mfa'} element={<MultifactorAuth />} />
      </ReactRoutes>
    </GlobalErrorBoundary>
  );

  return (
    <CustomRouter basename={'/'} history={history}>
      <StyledFlexColumnContainer>
        <AppHeader />
        {currentUser.id ? renderLoggedInView() : renderLoggedOutView()}
      </StyledFlexColumnContainer>
    </CustomRouter>
  );
};
