import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CustomRouter, history } from 'Routes';
import { GlobalErrorBoundary } from 'Modules/GlobalErrorBoundary';
import { LandingPage } from 'Modules/LandingPage';
import { Login, Signup, SignupConfirmation, SuccessNotification } from 'Modules/Auth';
import { Dashboard } from 'Modules/Dashboard';
import { ProjectPage } from 'Modules/ProjectPage';
import { Board } from 'Modules/Board';
import { Backlog } from 'Modules/Backlog';
import { UnassignedUserPage } from 'Modules/UnassignedUserPage';
import { OrganisationPage } from 'Modules/OrganisationPage';
import { SprintPage } from 'Modules/SprintPage';
import { UserProfile } from 'Modules/UserProfile';
import { UserModel, IUserModel } from 'Models/UserModel';
import { actionCreators } from 'Stores/User';
import { NOTIFICATION_TYPES } from 'Shared/constants';
import { PermissionCheck } from 'Utils/PermissionCheck';
import { AppHeader, AppMainWindow, AppSidebar } from './components';
import { HorizontalWrapper, LayoutWrapper } from './MainLayout.styled';

export const MainLayout = (): JSX.Element => {
  const [currentUser, setCurrentUser] = React.useState<IUserModel>({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    accessToken: '',
    authorities: [],
    avatar: ''
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    const subscription = UserModel.currentUser.subscribe((user: IUserModel) => {
      setCurrentUser(user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
            <Route path={'/board'} element={<Board />} />
            <Route path={'/backlog'} element={<Backlog />} />
            <Route path={'/organisation'} element={<OrganisationPage />} />
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
    <HorizontalWrapper>
      {PermissionCheck.isUnassignedUser ? renderForUnassignedUser() : renderForAssignedUser()}
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
