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

type AuthResponse = {
  refreshToken: string;
  accessToken: string;
  message?: string;
  authorities: USER_ROLES[];
} & User.UserFullInfo;

export interface UserState {
  isLoading: boolean;
  userInfo: User.UserFullInfo;
  accessToken: string;
  organisation: Organisation.OrganisationEntity;
  errors?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

interface SetLoginInfoAction {
  type: typeof ActionTypes.SET_LOGIN_INFO;
  userInfo: User.UserFullInfo;
  accessToken: string;
  isLoading: boolean;
}

interface SetUserInfoAction {
  type: typeof ActionTypes.SET_USER_INFO;
  userInfo: User.UserFullInfo;
  isLoading: boolean;
}

interface SetUserLoadingAction {
  type: typeof ActionTypes.SET_USER_LOADING;
  isLoading: boolean;
}

interface SetUserOrganisationAction {
  type: typeof ActionTypes.SET_USER_ORGANISATION;
  organisation: Organisation.OrganisationEntity;
}

interface SetUserErrorsAction {
  type: typeof ActionTypes.SET_USER_ERRORS;
  errors?: string;
}

interface SetTokenAction {
  type: typeof ActionTypes.SET_TOKEN;
  accessToken: string;
}

interface SetLogoutAction {
  type: typeof ActionTypes.SET_LOGOUT;
}

export type UserActionTypes =
  | SetLoginInfoAction
  | SetUserInfoAction
  | SetUserLoadingAction
  | SetUserOrganisationAction
  | SetUserErrorsAction
  | SetTokenAction
  | SetLogoutAction;

export const actionCreators = {
  loginUser:
    ({
      username,
      password
    }: LoginCredentials): AppThunkAction<UserActionTypes | ProjectActionTypes> | string =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_USER_LOADING,
        isLoading: true
      });

      if (appState && appState.user) {
        const result = await Api.postWithCredentials('auth/login', { username, password });
        const { accessToken, authorities, refreshToken, message, ...rest }: AuthResponse =
          await result.json();

        if (result.status === 200) {
          history.push('/');
          UserModel.currentUserSubject.next({
            accessToken,
            authorities,
            ...rest
          });

          // TODO: Development only
          localStorage.setItem('refreshToken', refreshToken);

          dispatch({
            type: ActionTypes.SET_LOGIN_INFO,
            accessToken,
            userInfo: {
              ...rest
            },
            isLoading: false
          });

          setTimeout(() => {
            dispatch(actionCreators.refresh());
          }, 0.9 * 15 * 60 * 1000);
        } else {
          dispatch({
            type: ActionTypes.SET_USER_LOADING,
            isLoading: false
          });
          return message;
        }
      }
    },
  logout: (): AppThunkAction<UserActionTypes> => async (dispatch, getState) => {
    const appState = getState();

    dispatch({
      type: ActionTypes.SET_USER_LOADING,
      isLoading: true
    });

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

      dispatch({
        type: ActionTypes.SET_USER_LOADING,
        isLoading: true
      });

      if (appState && appState.user) {
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedRefreshToken) {
          const result = await Api.post(`auth/refresh?refreshToken=${storedRefreshToken}`);

          if (result.status === 401) {
            dispatch({
              type: ActionTypes.SET_USER_LOADING,
              isLoading: false
            });
          } else {
            const { accessToken, authorities, message, refreshToken, ...rest }: AuthResponse =
              await result.json();
            if (result.status === 200) {
              UserModel.currentUserSubject.next({
                accessToken,
                authorities,
                ...rest
              });

              dispatch({
                type: ActionTypes.SET_LOGIN_INFO,
                accessToken,
                userInfo: {
                  ...rest
                },
                isLoading: false
              });

              dispatch(projectActionCreators.getOrganisationsProjects());

              setTimeout(() => {
                dispatch(actionCreators.refresh());
              }, 0.9 * 15 * 60 * 1000);
            } else {
              dispatch({
                type: ActionTypes.SET_USER_ERRORS,
                errors: message
              });
            }
          }
        } else {
          dispatch({
            type: ActionTypes.SET_USER_LOADING,
            isLoading: false
          });
        }
      }
    },
  getCurrentUserDetails: (): AppThunkAction<UserActionTypes> => async (dispatch, getState) => {
    const appState = getState();

    dispatch({
      type: ActionTypes.SET_USER_LOADING,
      isLoading: true
    });

    if (appState && appState.user) {
      const result = await Api.get('user/me');

      if (result.status === 200) {
        const json: User.UserFullInfo = await result.json();
        const { currentUserSubject, currentUserValue } = UserModel;

        currentUserSubject.next({
          ...json,
          accessToken: currentUserValue.accessToken,
          authorities: currentUserValue.authorities
        });

        dispatch({
          type: ActionTypes.SET_USER_INFO,
          userInfo: {
            ...json
          },
          isLoading: false
        });
      } else {
        dispatch({
          type: ActionTypes.SET_USER_LOADING,
          isLoading: false
        });
      }
    }
  },
  getOrganisation: (): AppThunkAction<UserActionTypes> => async (dispatch, getState) => {
    const appState = getState();

    dispatch({
      type: ActionTypes.SET_USER_LOADING,
      isLoading: true
    });

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
  isLoading: false,
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
  accessToken: '',
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
    case ActionTypes.SET_LOGIN_INFO:
      return {
        ...state,
        userInfo: updateObject(state.userInfo, action.userInfo),
        isLoading: false,
        accessToken: action.accessToken,
        errors: ''
      };
    case ActionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: updateObject(state.userInfo, action.userInfo),
        isLoading: false
      };
    case ActionTypes.SET_USER_ORGANISATION:
      return {
        ...state,
        isLoading: false,
        organisation: action.organisation
      };
    case ActionTypes.SET_LOGOUT:
      return initialState;
    case ActionTypes.SET_USER_ERRORS:
      return {
        ...state,
        isLoading: false,
        errors: action.errors
      };
    case ActionTypes.SET_TOKEN:
      return {
        ...state,
        isLoading: false,
        accessToken: action.accessToken
      };
    case ActionTypes.SET_USER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
        errors: ''
      };
    default:
      return state;
  }
};
