import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { CustomRouter, history } from 'Routes';
import { GlobalErrorBoundary } from 'Modules/GlobalErrorBoundary';
import { LandingPage } from 'Modules/LandingPage';
import { Login, Signup, SignupConfirmation, SuccessNotification } from 'Modules/Auth';
import { Dashboard } from 'Modules/Dashboard';
import { ProjectPage } from 'Modules/ProjectPage';
import { UnassignedUserPage } from 'Modules/UnassignedUserPage';
import { OrganisationPage } from 'Modules/OrganisationPage';
import { UserModel, IUserModel } from 'Models/UserModel';
import { actionCreators } from 'Stores/User';
import { NOTIFICATION_TYPES } from 'Shared/constants';
import { PermissionCheck } from 'Utils/PermissionCheck';
import { AppHeader } from './components/AppHeader/AppHeader';
import { AppSidebar } from './components/AppSidebar/AppSidebar';
import { AppMainWindow } from './components/AppMainWindow/AppMainWindow';
import { HorizontalWrapper, LayoutWrapper } from './MainLayout.styled';

export const MainLayout = (): JSX.Element => {
  const [currentUser, setCurrentUser] = React.useState<IUserModel>({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    accessToken: '',
    authorities: []
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    UserModel.currentUser.subscribe((user: IUserModel) => {
      setCurrentUser(user);
    });
  }, [UserModel.currentUser]);

  React.useEffect(() => {
    if (!currentUser.accessToken) {
      dispatch(actionCreators.refresh());
    }
  }, []);

  const renderForAssignedUser = (): JSX.Element => (
    <React.Fragment>
      <AppSidebar />
      <AppMainWindow>
        <GlobalErrorBoundary>
          <ReactRoutes>
            <Route path={'/'} element={<Dashboard />} />
            <Route path={'/project/:id'} element={<ProjectPage />} />
            <Route path={'/organisation'} element={<OrganisationPage />} />
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
        </ReactRoutes>
      </GlobalErrorBoundary>
    </AppMainWindow>
  );

  const renderLoggedInView = (): JSX.Element => (
    <HorizontalWrapper>
      {currentUser.authorities.some(PermissionCheck.isUnassignedUser)
        ? renderForUnassignedUser()
        : renderForAssignedUser()}
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
        <AppHeader isLoggedIn={Boolean(currentUser.accessToken)} />
        {currentUser.accessToken ? renderLoggedInView() : renderLoggedOutView()}
      </LayoutWrapper>
    </CustomRouter>
  );
};
