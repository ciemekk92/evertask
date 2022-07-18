import { Action, Reducer } from 'redux';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { Organisation } from 'Types/Organisation';
import { ActionTypes } from './constants';
import { AppThunkAction } from './store';

export interface OrganisationInvitationState {
  userInvitations: Organisation.OrganisationInvitation[];
  allInvitations: Organisation.OrganisationInvitation[];
}

interface SetUserInvitationsAction {
  type: typeof ActionTypes.SET_USER_ORGANISATION_INVITATIONS;
  userInvitations: Organisation.OrganisationInvitation[];
}

interface SetAllOrganisationInvitationsAction {
  type: typeof ActionTypes.SET_ALL_ORGANISATION_INVITATIONS;
  allInvitations: Organisation.OrganisationInvitation[];
}

export type OrganisationInvitationActionTypes =
  | SetUserInvitationsAction
  | SetAllOrganisationInvitationsAction;

export const actionCreators = {
  getUserInvitations:
    (): AppThunkAction<OrganisationInvitationActionTypes> => async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.organisationInvitation) {
        const result = await Api.get('user/organisation_invitations');

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_USER_ORGANISATION_INVITATIONS,
            userInvitations: json
          });
        }
      }
    },
  getAllInvitationsForOrganisation:
    (id: Id): AppThunkAction<OrganisationInvitationActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.organisationInvitation) {
        const result = await Api.get(`organisations/${id}/invitations`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_ALL_ORGANISATION_INVITATIONS,
            allInvitations: json
          });
        }
      }
    }
};

const initialState: OrganisationInvitationState = {
  userInvitations: [],
  allInvitations: []
};

export const reducer: Reducer<OrganisationInvitationState> = (
  state: OrganisationInvitationState | undefined,
  incomingAction: Action
): OrganisationInvitationState => {
  if (!isDefined(state)) {
    return initialState;
  }

  const action = incomingAction as OrganisationInvitationActionTypes;

  switch (action.type) {
    case ActionTypes.SET_USER_ORGANISATION_INVITATIONS:
      return {
        ...state,
        userInvitations: action.userInvitations
      };
    case ActionTypes.SET_ALL_ORGANISATION_INVITATIONS:
      return {
        ...state,
        allInvitations: action.allInvitations
      };
    default:
      return state;
  }
};
