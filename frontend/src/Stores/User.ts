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
}

export interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
}

interface LoginCredentials {
  email: string;
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
  | SetTokenAction
  | SetLogoutAction;

export const actionCreators = {
  loginUser:
    ({ email, password }: LoginCredentials): AppThunkAction<UserActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_USER_LOADING,
        isLoading: true
      });

      if (appState && appState.user) {
        const result = await Api.post('auth/login', { email, password });

        if (result.status === 200) {
          const json = await result.json();

          UserModel.currentUserSubject.next({
            ...json
          });

          dispatch({
            type: ActionTypes.SET_LOGIN_INFO,
            accessToken: json.accessToken,
            userInfo: { ...json },
            isLoading: false
          });
        } else {
          dispatch({
            type: ActionTypes.SET_USER_LOADING,
            isLoading: false
          });
        }

        history.push('/');
      }
    }
};

const initialState: UserState = {
  isLoading: false,
  userInfo: {
    username: '',
    firstName: '',
    lastName: ''
  },
  accessToken: ''
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
        accessToken: action.accessToken
      };
    case ActionTypes.SET_USER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
