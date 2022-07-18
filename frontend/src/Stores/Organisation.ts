import { Action, Reducer } from 'redux';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { User } from 'Types/User';
import { ActionTypes } from './constants';
import { AppThunkAction } from './store';

export interface OrganisationState {
  unassignedUsers: User.UserEntity[];
}

interface SetUnassignedUsersAction {
  type: typeof ActionTypes.SET_UNASSIGNED_USERS;
  unassignedUsers: User.UserEntity[];
}

export type OrganisationActionTypes = SetUnassignedUsersAction;

export const actionCreators = {
  getUnassignedUsers:
    (query?: string): AppThunkAction<OrganisationActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

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
        unassignedUsers: action.unassignedUsers
      };
    default:
      return state;
  }
};
