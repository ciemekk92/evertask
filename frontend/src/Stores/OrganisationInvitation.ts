import { Action, Reducer } from 'redux';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { ActionTypes } from './constants';
import { AppThunkAction } from './store';

export interface OrganisationInvitationState {
  isLoading: boolean;
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

interface SetOrganisationInvitationLoadingAction {
  type: typeof ActionTypes.SET_ORGANISATION_INVITATIONS_LOADING;
  isLoading: boolean;
}

export type OrganisationInvitationActionTypes =
  | SetUserInvitationsAction
  | SetAllOrganisationInvitationsAction
  | SetOrganisationInvitationLoadingAction;

export const actionCreators = {
  getUserInvitations:
    (): AppThunkAction<OrganisationInvitationActionTypes> => async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_ORGANISATION_INVITATIONS_LOADING,
        isLoading: true
      });

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

      dispatch({
        type: ActionTypes.SET_ORGANISATION_INVITATIONS_LOADING,
        isLoading: true
      });

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
  isLoading: false,
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
        isLoading: false,
        userInvitations: action.userInvitations
      };
    case ActionTypes.SET_ALL_ORGANISATION_INVITATIONS:
      return {
        ...state,
        isLoading: false,
        allInvitations: action.allInvitations
      };
    case ActionTypes.SET_ORGANISATION_INVITATIONS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
