import { Action, Reducer } from 'redux';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { updateObject } from 'Utils/updateObject';
import { UserModel } from 'Models/UserModel';
import { history } from 'Routes';
import { Organisation } from 'Types/Organisation';
import { AppThunkAction } from './store';
import { ActionTypes } from './constants';
import { actionCreators as projectActionCreators, ProjectActionTypes } from './Project';

export interface UserState {
  isLoading: boolean;
  userInfo: User.UserFullInfo;
  accessToken: string;
  organisation: Organisation.OrganisationEntity;
  errors: string;
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
  errors: string;
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
        const json = await result.json();

        if (result.status === 200) {
          history.push('/');
          UserModel.currentUserSubject.next({
            firstName: json.firstName,
            lastName: json.lastName,
            email: json.email,
            username: json.username,
            accessToken: json.accessToken,
            authorities: json.authorities,
            avatar: json.avatar
          });

          // TODO: Development only
          localStorage.setItem('refreshToken', json.refreshToken);

          dispatch({
            type: ActionTypes.SET_LOGIN_INFO,
            accessToken: json.accessToken,
            userInfo: {
              firstName: json.firstName,
              lastName: json.lastName,
              email: json.email,
              username: json.username,
              avatar: json.avatar
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
          return json.message;
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
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          const result = await Api.post(`auth/refresh?refreshToken=${refreshToken}`);

          if (result.status === 401) {
            dispatch({
              type: ActionTypes.SET_USER_LOADING,
              isLoading: false
            });
          } else {
            const {
              firstName,
              lastName,
              email,
              username,
              accessToken,
              authorities,
              avatar,
              message
            } = await result.json();
            if (result.status === 200) {
              UserModel.currentUserSubject.next({
                firstName,
                lastName,
                email,
                username,
                accessToken,
                authorities,
                avatar
              });

              dispatch({
                type: ActionTypes.SET_LOGIN_INFO,
                accessToken,
                userInfo: {
                  firstName,
                  lastName,
                  email,
                  username,
                  avatar
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
        const { firstName, lastName, email, username, avatar } =
          (await result.json()) as User.UserFullInfo;
        const { currentUserSubject, currentUserValue } = UserModel;

        currentUserSubject.next({
          firstName,
          lastName,
          email,
          username,
          accessToken: currentUserValue.accessToken,
          authorities: currentUserValue.authorities,
          avatar
        });

        dispatch({
          type: ActionTypes.SET_USER_INFO,
          userInfo: {
            firstName,
            lastName,
            email,
            username,
            avatar
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
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    avatar: ''
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
