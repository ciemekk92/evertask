import { Action, Reducer } from 'redux';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { updateObject } from 'Utils/updateObject';
import { UserModel } from 'Models/UserModel';
import { history } from 'Routes';
import { AppThunkAction } from './store';
import { ActionTypes } from './constants';

export interface UserState {
  isLoading: boolean;
  userInfo: UserInfo;
  accessToken: string;
  errors: string;
}

export interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

interface SetLoginInfoAction {
  type: typeof ActionTypes.SET_LOGIN_INFO;
  userInfo: UserInfo;
  accessToken: string;
  isLoading: boolean;
}

interface SetUserLoadingAction {
  type: typeof ActionTypes.SET_USER_LOADING;
  isLoading: boolean;
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
  | SetUserLoadingAction
  | SetUserErrorsAction
  | SetTokenAction
  | SetLogoutAction;

export const actionCreators = {
  loginUser:
    ({ username, password }: LoginCredentials): AppThunkAction<UserActionTypes> | string =>
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
          UserModel.currentUserSubject.next({
            ...json
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
              username: json.username
            },
            isLoading: false
          });

          setTimeout(() => {
            dispatch(actionCreators.refresh());
          }, 15 * 60 * 1000);

          history.push('/');
        } else {
          dispatch({
            type: ActionTypes.SET_USER_LOADING,
            isLoading: false
          });
          return json.message;
        }
      }
    },
  refresh: (): AppThunkAction<UserActionTypes> => async (dispatch, getState) => {
    const appState = getState();

    dispatch({
      type: ActionTypes.SET_USER_LOADING,
      isLoading: true
    });

    if (appState && appState.user) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        const result = await Api.post(`auth/refresh?refreshToken=${refreshToken}`);
        const json = await result.json();

        if (result.status === 200) {
          dispatch({
            type: ActionTypes.SET_TOKEN,
            accessToken: json.accessToken
          });

          setTimeout(() => {
            dispatch(actionCreators.refresh());
          }, 15 * 60 * 1000);
        } else {
          dispatch({
            type: ActionTypes.SET_USER_ERRORS,
            errors: json.message
          });
        }
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
    email: ''
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
        userInfo: updateObject(state.userInfo, action.userInfo),
        isLoading: false,
        accessToken: action.accessToken,
        errors: ''
      };
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
