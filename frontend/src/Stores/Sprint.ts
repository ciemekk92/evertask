import { Action, Reducer } from 'redux';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { Issue } from 'Types/Issue';
import { Sprint } from 'Types/Sprint';
import { ActionTypes } from './constants';
import { AppThunkAction } from './store';

export interface SprintState {
  isLoading: boolean;
  selectedSprint: Sprint.SprintEntity;
  activeMembers: User.UserEntity[];
  sprintIssues: Issue.IssueEntity[];
}

interface SetSelectedSprintAction {
  type: typeof ActionTypes.SET_SELECTED_SPRINT;
  selectedSprint: Sprint.SprintEntity;
}

interface SetSprintIssuesAction {
  type: typeof ActionTypes.SET_SPRINT_ISSUES;
  sprintIssues: Issue.IssueEntity[];
}

interface SetSprintActiveMembersAction {
  type: typeof ActionTypes.SET_SPRINT_ACTIVE_MEMBERS;
  activeMembers: User.UserEntity[];
}

interface SetSprintLoadingAction {
  type: typeof ActionTypes.SET_SPRINT_LOADING;
  isLoading: boolean;
}

export type SprintActionTypes =
  | SetSelectedSprintAction
  | SetSprintIssuesAction
  | SetSprintActiveMembersAction
  | SetSprintLoadingAction;

export const actionCreators = {
  getSelectedSprint:
    (id: Id): AppThunkAction<SprintActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_SPRINT_LOADING,
        isLoading: true
      });

      if (appState && appState.sprint) {
        const result = await Api.get(`sprints/${id}`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_SELECTED_SPRINT,
            selectedSprint: json
          });
        } else {
          dispatch({
            type: ActionTypes.SET_SPRINT_LOADING,
            isLoading: false
          });
        }
      }
    },
  getSprintIssues:
    (id: Id): AppThunkAction<SprintActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_SPRINT_LOADING,
        isLoading: true
      });

      if (appState && appState.sprint) {
        const result = await Api.get(`sprints/${id}/issues`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_SPRINT_ISSUES,
            sprintIssues: json
          });
        } else {
          dispatch({
            type: ActionTypes.SET_SPRINT_LOADING,
            isLoading: false
          });
        }
      }
    },
  getActiveMembers:
    (id: Id): AppThunkAction<SprintActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_SPRINT_LOADING,
        isLoading: true
      });

      if (appState && appState.sprint) {
        const result = await Api.get(`sprints/${id}/active_members`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_SPRINT_ACTIVE_MEMBERS,
            activeMembers: json
          });
        } else {
          dispatch({
            type: ActionTypes.SET_SPRINT_LOADING,
            isLoading: false
          });
        }
      }
    }
};

const initialState: SprintState = {
  isLoading: false,
  sprintIssues: [],
  activeMembers: [],
  selectedSprint: {
    completed: false,
    id: '',
    createdAt: '',
    updatedAt: '',
    ordinal: 0,
    description: '',
    startDate: '',
    finishDate: '',
    projectId: ''
  }
};

export const reducer: Reducer<SprintState> = (
  state: SprintState | undefined,
  incomingAction: Action
): SprintState => {
  if (!isDefined(state)) {
    return initialState;
  }

  const action = incomingAction as SprintActionTypes;

  switch (action.type) {
    case ActionTypes.SET_SELECTED_SPRINT:
      return {
        ...state,
        isLoading: false,
        selectedSprint: action.selectedSprint
      };
    case ActionTypes.SET_SPRINT_ISSUES:
      return {
        ...state,
        isLoading: false,
        sprintIssues: action.sprintIssues
      };
    case ActionTypes.SET_SPRINT_ACTIVE_MEMBERS:
      return {
        ...state,
        isLoading: false,
        activeMembers: action.activeMembers
      };
    case ActionTypes.SET_SPRINT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
