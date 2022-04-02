import { Action, Reducer } from 'redux';
import { Issue } from 'Types/Issue';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { AppThunkAction } from './store';
import { ActionTypes } from './constants';

export interface IssueState {
  isLoading: boolean;
  assignedIssues: Issue[];
  projectIssues: Issue[];
}

interface SetAssignedIssuesAction {
  type: typeof ActionTypes.SET_ASSIGNED_ISSUES;
  assignedIssues: Issue[];
}

interface SetProjectIssuesAction {
  type: typeof ActionTypes.SET_PROJECT_ISSUES;
  projectIssues: Issue[];
}

interface SetIssueLoadingAction {
  type: typeof ActionTypes.SET_ISSUE_LOADING;
  isLoading: boolean;
}

export type IssueActionTypes =
  | SetAssignedIssuesAction
  | SetProjectIssuesAction
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
      }
    }
  }
};

const initialState: IssueState = {
  isLoading: false,
  assignedIssues: [],
  projectIssues: []
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
    case ActionTypes.SET_PROJECT_ISSUES:
      return {
        ...state,
        isLoading: false,
        projectIssues: action.projectIssues
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
