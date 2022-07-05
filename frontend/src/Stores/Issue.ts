import { Action, Reducer } from 'redux';
import { ISSUE_STATUS } from 'Shared/constants';
import { Issue } from 'Types/Issue';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { AppThunkAction } from './store';
import { ActionTypes } from './constants';

export interface IssueState {
  isLoading: boolean;
  assignedIssues: Issue.IssueEntity[];
  issuesUnassignedToSprint: Issue.IssueEntity[];
  boardIssues: PartialRecord<ISSUE_STATUS, Issue.IssueEntity[]>;
}

interface SetAssignedIssuesAction {
  type: typeof ActionTypes.SET_ASSIGNED_ISSUES;
  assignedIssues: Issue.IssueEntity[];
}

interface SetIssuesUnassignedToSprintAction {
  type: typeof ActionTypes.SET_ISSUES_UNASSIGNED_TO_SPRINT;
  issuesUnassignedToSprint: Issue.IssueEntity[];
}

interface SetBoardIssuesAction {
  type: typeof ActionTypes.SET_BOARD_ISSUES;
  boardIssues: PartialRecord<ISSUE_STATUS, Issue.IssueEntity[]>;
}

interface SetIssueLoadingAction {
  type: typeof ActionTypes.SET_ISSUE_LOADING;
  isLoading: boolean;
}

export type IssueActionTypes =
  | SetAssignedIssuesAction
  | SetIssuesUnassignedToSprintAction
  | SetBoardIssuesAction
  | SetIssueLoadingAction;

export const actionCreators = {
  getAssignedIssues: (): AppThunkAction<IssueActionTypes> => async (dispatch, getState) => {
    const appState = getState();

    dispatch({
      type: ActionTypes.SET_ISSUE_LOADING,
      isLoading: true
    });

    if (appState && appState.issue) {
      const result = await Api.get('issues/assigned_to_me');

      if (result.status === 200) {
        const json = await result.json();

        dispatch({
          type: ActionTypes.SET_ASSIGNED_ISSUES,
          assignedIssues: json
        });
      } else {
        dispatch({
          type: ActionTypes.SET_ISSUE_LOADING,
          isLoading: false
        });
      }
    }
  },
  getCurrentIssues:
    (projectId: Id): AppThunkAction<IssueActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_ISSUE_LOADING,
        isLoading: true
      });

      if (appState && appState.issue) {
        const result = await Api.get(`projects/${projectId}/current_issues`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_BOARD_ISSUES,
            boardIssues: json
          });
        } else {
          dispatch({
            type: ActionTypes.SET_ISSUE_LOADING,
            isLoading: false
          });
        }
      }
    },
  getIssuesUnassignedToSprint:
    (projectId: Id): AppThunkAction<IssueActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_ISSUE_LOADING,
        isLoading: true
      });

      if (appState && appState.issue) {
        const result = await Api.get(`projects/${projectId}/unassigned_issues`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_ISSUES_UNASSIGNED_TO_SPRINT,
            issuesUnassignedToSprint: json
          });
        } else {
          dispatch({
            type: ActionTypes.SET_ISSUE_LOADING,
            isLoading: false
          });
        }
      }
    }
};

const initialState: IssueState = {
  isLoading: false,
  assignedIssues: [],
  issuesUnassignedToSprint: [],
  boardIssues: {}
};

export const reducer: Reducer<IssueState> = (
  state: IssueState | undefined,
  incomingAction: Action
): IssueState => {
  if (!isDefined(state)) {
    return initialState;
  }

  const action = incomingAction as IssueActionTypes;

  switch (action.type) {
    case ActionTypes.SET_ASSIGNED_ISSUES:
      return {
        ...state,
        isLoading: false,
        assignedIssues: action.assignedIssues
      };
    case ActionTypes.SET_BOARD_ISSUES:
      return {
        ...state,
        isLoading: false,
        boardIssues: action.boardIssues
      };
    case ActionTypes.SET_ISSUES_UNASSIGNED_TO_SPRINT:
      return {
        ...state,
        isLoading: false,
        issuesUnassignedToSprint: action.issuesUnassignedToSprint
      };
    case ActionTypes.SET_ISSUE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
