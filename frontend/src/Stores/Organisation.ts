import { Action, Reducer } from 'redux';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { User } from 'Types/User';
import { ActionTypes } from './constants';
import { AppThunkAction } from './store';

export interface OrganisationState {
  unassignedUsers: User.UserEntity[];
  organisationMembers: User.UserEntity[];
}

interface SetUnassignedUsersAction {
  type: typeof ActionTypes.SET_UNASSIGNED_USERS;
  unassignedUsers: User.UserEntity[];
}

interface SetOrganisationMembersAction {
  type: typeof ActionTypes.SET_ORGANISATION_MEMBERS;
  organisationMembers: User.UserEntity[];
}

export type OrganisationActionTypes = SetUnassignedUsersAction | SetOrganisationMembersAction;

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
    },
  getOrganisationMembers:
    (id: Id): AppThunkAction<OrganisationActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.organisation) {
        const result = await Api.get(`organisations/${id}/members`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_ORGANISATION_MEMBERS,
            organisationMembers: json
          });
        }
      }
    }
};

const initialState: OrganisationState = {
  unassignedUsers: [],
  organisationMembers: []
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
    case ActionTypes.SET_ORGANISATION_MEMBERS:
      return {
        ...state,
        organisationMembers: action.organisationMembers
      };
    default:
      return state;
  }
};
