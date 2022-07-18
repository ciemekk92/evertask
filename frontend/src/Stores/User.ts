import { Action, Reducer } from 'redux';
import { INTERFACE_LANGUAGE, USER_ROLES } from 'Shared/constants';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { updateObject } from 'Utils/updateObject';
import { UserModel } from 'Models/UserModel';
import { history } from 'Routes';
import { Organisation } from 'Types/Organisation';
import { User } from 'Types/User';
import { AppThunkAction } from './store';
import { ActionTypes } from './constants';
import { actionCreators as projectActionCreators, ProjectActionTypes } from './Project';

type UserDetailsFullResponse = {
  refreshToken: string;
  accessToken: string;
  mfaEnabled: boolean;
  message?: string;
  authorities: USER_ROLES[];
} & User.UserFullInfo;

type AuthResponse = { message?: string } & (
  | {
      accessToken: string;
      refreshToken: null;
      mfaEnabled: true;
    }
  | { accessToken: string; refreshToken: string; mfaEnabled: false }
);

export interface UserState {
  userInfo: User.UserFullInfo;
  organisation: Organisation.OrganisationEntity;
  errors?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

interface SetUserInfoAction {
  type: typeof ActionTypes.SET_USER_INFO;
  userInfo: User.UserFullInfo;
}

interface SetUserOrganisationAction {
  type: typeof ActionTypes.SET_USER_ORGANISATION;
  organisation: Organisation.OrganisationEntity;
}

interface SetUserErrorsAction {
  type: typeof ActionTypes.SET_USER_ERRORS;
  errors?: string;
}

interface SetLogoutAction {
  type: typeof ActionTypes.SET_LOGOUT;
}

export type UserActionTypes =
  | SetUserInfoAction
  | SetUserOrganisationAction
  | SetUserErrorsAction
  | SetLogoutAction;

export const actionCreators = {
  loginUser:
    ({
      username,
      password
    }: LoginCredentials): AppThunkAction<UserActionTypes | ProjectActionTypes> | string =>
    async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.user) {
        const result = await Api.postWithCredentials('auth/login', { username, password });
        const { accessToken, refreshToken, mfaEnabled, message }: AuthResponse =
          await result.json();

        if (result.status === 200) {
          UserModel.currentUserSubject.next({
            ...UserModel.currentUserValue,
            accessToken,
            mfaEnabled
          });

          if (mfaEnabled) {
            history.push('/mfa');
          } else {
            history.push('/');
            if (refreshToken) {
              // TODO: Development only
              localStorage.setItem('refreshToken', refreshToken);

              dispatch(actionCreators.refresh());
            }
          }
        }

        return message;
      }
    },
  verifyMfa:
    (code: string): AppThunkAction<UserActionTypes | ProjectActionTypes> | string =>
    async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.user) {
        const result = await Api.post('auth/verify', { code });

        const { accessToken, refreshToken, mfaEnabled, message }: AuthResponse =
          await result.json();

        if (result.status === 200) {
          UserModel.currentUserSubject.next({
            ...UserModel.currentUserValue,
            accessToken,
            mfaEnabled
          });

          // TODO: Development only
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
          }

          history.push('/');
          dispatch(actionCreators.refresh());
        }

        return message;
      }
    },
  logout: (): AppThunkAction<UserActionTypes> => async (dispatch, getState) => {
    const appState = getState();

    if (appState && appState.user) {
      const result = await Api.post('auth/logout');

      if (result.status === 200) {
        dispatch({
          type: ActionTypes.SET_LOGOUT
        });
        localStorage.removeItem('refreshToken');
        history.push('/');
        window.location.reload();
      }
    }
  },
  refresh:
    (): AppThunkAction<UserActionTypes | ProjectActionTypes> => async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.user) {
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedRefreshToken) {
          const result = await Api.post(`auth/refresh?refreshToken=${storedRefreshToken}`);

          if (result.status === 401) {
            // TODO: handle 401?
          } else {
            const {
              accessToken,
              authorities,
              message,
              refreshToken,
              ...rest
            }: UserDetailsFullResponse = await result.json();
            if (result.status === 200) {
              UserModel.currentUserSubject.next({
                accessToken,
                authorities,
                ...rest
              });

              dispatch({
                type: ActionTypes.SET_USER_INFO,
                userInfo: {
                  ...rest
                }
              });

              dispatch(projectActionCreators.getOrganisationsProjects());

              setTimeout(() => {
                dispatch(actionCreators.refresh());
              }, 0.9 * 60 * 60 * 1000);
            } else {
              dispatch({
                type: ActionTypes.SET_USER_ERRORS,
                errors: message
              });
            }
          }
        }
      }
    },
  getCurrentUserDetails: (): AppThunkAction<UserActionTypes> => async (dispatch, getState) => {
    const appState = getState();

    if (appState && appState.user) {
      const result = await Api.get('user/me');

      if (result.status === 200) {
        const json: User.UserFullInfo = await result.json();
        const { currentUserSubject, currentUserValue } = UserModel;

        currentUserSubject.next({
          ...json,
          mfaEnabled: currentUserValue.mfaEnabled,
          accessToken: currentUserValue.accessToken,
          authorities: currentUserValue.authorities
        });

        dispatch({
          type: ActionTypes.SET_USER_INFO,
          userInfo: {
            ...json
          }
        });
      }
    }
  },
  getOrganisation: (): AppThunkAction<UserActionTypes> => async (dispatch, getState) => {
    const appState = getState();

    if (appState && appState.user) {
      const result = await Api.get('user/organisation');

      if (result.status === 200) {
        const json = await result.json();

        dispatch({
          type: ActionTypes.SET_USER_ORGANISATION,
          organisation: json
        });
      }
    }
  }
};

const initialState: UserState = {
  userInfo: {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    bio: null,
    phoneNumber: null,
    userSettings: {
      darkMode: false,
      interfaceLanguage: INTERFACE_LANGUAGE.EN,
      interfaceColor: '#3F51B5'
    }
  },
  organisation: {
    id: '',
    name: '',
    description: '',
    createdAt: '',
    updatedAt: null,
    projects: [],
    members: []
  },
  errors: ''
};

export const reducer: Reducer<UserState> = (
  state: UserState | undefined,
  incomingAction: Action
): UserState => {
  if (!isDefined(state)) {
    return initialState;
  }

  const action = incomingAction as UserActionTypes;

  switch (action.type) {
    case ActionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: updateObject(state.userInfo, action.userInfo)
      };
    case ActionTypes.SET_USER_ORGANISATION:
      return {
        ...state,
        organisation: action.organisation
      };
    case ActionTypes.SET_LOGOUT:
      return initialState;
    case ActionTypes.SET_USER_ERRORS:
      return {
        ...state,
        errors: action.errors
      };
    default:
      return state;
  }
};
