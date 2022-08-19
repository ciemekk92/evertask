import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CustomRouter, history } from 'Routes';
import { GlobalErrorBoundary } from 'Modules/GlobalErrorBoundary';
import { LandingPage } from 'Modules/LandingPage';
import {
  Login,
  MultifactorAuth,
  Signup,
  SignupConfirmation,
  SuccessNotification
} from 'Modules/Auth';
import { Backlog } from 'Modules/Backlog';
import { Board } from 'Modules/Board';
import { Dashboard } from 'Modules/Dashboard';
import { ERROR_TYPE, ErrorPage } from 'Modules/ErrorPage';
import { IssuePage } from 'Modules/IssuePage';
import { OrganisationPage } from 'Modules/OrganisationPage';
import { ProjectPage } from 'Modules/ProjectPage';
import { SprintPage } from 'Modules/SprintPage';
import { Statistics } from 'Modules/Statistics';
import { UnassignedUserPage } from 'Modules/UnassignedUserPage';
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

  const renderErrorPageRoutes = () => (
    <React.Fragment>
      <Route path={'/forbidden'} element={<ErrorPage type={ERROR_TYPE.FORBIDDEN} />} />
      <Route path={'/not_found'} element={<ErrorPage type={ERROR_TYPE.NOT_FOUND} />} />
      <Route path={'/unauthorized'} element={<ErrorPage type={ERROR_TYPE.UNAUTHORIZED} />} />
    </React.Fragment>
  );

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
            {renderErrorPageRoutes()}
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
          {renderErrorPageRoutes()}
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
        {renderErrorPageRoutes()}
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
