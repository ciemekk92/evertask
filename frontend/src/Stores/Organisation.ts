import { Action, Reducer } from 'redux';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { ActionTypes } from './constants';
import { AppThunkAction } from './store';

export interface OrganisationState {
  isLoading: boolean;
  unassignedUsers: User.UserEntity[];
}

interface SetUnassignedUsersAction {
  type: typeof ActionTypes.SET_UNASSIGNED_USERS;
  unassignedUsers: User.UserEntity[];
}

interface SetOrganisationLoadingAction {
  type: typeof ActionTypes.SET_ORGANISATION_LOADING;
  isLoading: boolean;
}

export type OrganisationActionTypes = SetUnassignedUsersAction | SetOrganisationLoadingAction;

export const actionCreators = {
  getUnassignedUsers:
    (query?: string): AppThunkAction<OrganisationActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_ORGANISATION_LOADING,
        isLoading: true
      });

      if (appState && appState.organisation) {
        const result = await Api.get(`user/unassigned`, { query });

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_UNASSIGNED_USERS,
            unassignedUsers: json
          });
        }
      }
    }
};

const initialState: OrganisationState = {
  isLoading: false,
  unassignedUsers: []
};

export const reducer: Reducer<OrganisationState> = (
  state: OrganisationState | undefined,
  incomingAction: Action
): OrganisationState => {
  if (!isDefined(state)) {
    return initialState;
  }

  const action = incomingAction as OrganisationActionTypes;

  switch (action.type) {
    case ActionTypes.SET_UNASSIGNED_USERS:
      return {
        ...state,
        isLoading: false,
        unassignedUsers: action.unassignedUsers
      };
    case ActionTypes.SET_ORGANISATION_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
