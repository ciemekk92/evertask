import { Action, Reducer } from 'redux';
import { ISSUE_STATUS } from 'Shared/constants';
import { Issue } from 'Types/Issue';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { AppThunkAction } from './store';
import { ActionTypes } from './constants';

export interface IssueState {
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

export type IssueActionTypes =
  | SetAssignedIssuesAction
  | SetIssuesUnassignedToSprintAction
  | SetBoardIssuesAction;

export const actionCreators = {
  getAssignedIssues: (): AppThunkAction<IssueActionTypes> => async (dispatch, getState) => {
    const appState = getState();

    if (appState && appState.issue) {
      const result = await Api.get('issues/assigned_to_me');

      if (result.status === 200) {
        const json = await result.json();

        dispatch({
          type: ActionTypes.SET_ASSIGNED_ISSUES,
          assignedIssues: json
        });
      }
    }
  },
  getCurrentIssues:
    (projectId: Id): AppThunkAction<IssueActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.issue) {
        const result = await Api.get(`projects/${projectId}/current_issues`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_BOARD_ISSUES,
            boardIssues: json
          });
        }
      }
    },
  getIssuesUnassignedToSprint:
    (projectId: Id): AppThunkAction<IssueActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.issue) {
        const result = await Api.get(`projects/${projectId}/unassigned_issues`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_ISSUES_UNASSIGNED_TO_SPRINT,
            issuesUnassignedToSprint: json
          });
        }
      }
    }
};

const initialState: IssueState = {
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
        assignedIssues: action.assignedIssues
      };
    case ActionTypes.SET_BOARD_ISSUES:
      return {
        ...state,
        boardIssues: action.boardIssues
      };
    case ActionTypes.SET_ISSUES_UNASSIGNED_TO_SPRINT:
      return {
        ...state,
        issuesUnassignedToSprint: action.issuesUnassignedToSprint
      };
    default:
      return state;
  }
};
