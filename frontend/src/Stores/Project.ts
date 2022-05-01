import { Action, Reducer } from 'redux';
import { Api } from 'Utils/Api';
import { PROJECT_METHODOLOGIES } from 'Shared/constants';
import { isDefined } from 'Utils/isDefined';
import { Project } from 'Types/Project';
import { ActionTypes } from './constants';
import { AppThunkAction } from './store';

export interface ProjectState {
  isLoading: boolean;
  userProjects: Project.ProjectEntity[];
  currentProject: Project.ProjectEntity;
}

interface SetUserProjectsAction {
  type: typeof ActionTypes.SET_USER_PROJECTS;
  userProjects: Project.ProjectEntity[];
}

interface SetCurrentProjectAction {
  type: typeof ActionTypes.SET_CURRENT_PROJECT;
  currentProject: Project.ProjectEntity;
}

interface SetProjectLoadingAction {
  type: typeof ActionTypes.SET_PROJECT_LOADING;
  isLoading: boolean;
}

export type ProjectActionTypes =
  | SetUserProjectsAction
  | SetCurrentProjectAction
  | SetProjectLoadingAction;

export const actionCreators = {
  getUserProjects: (): AppThunkAction<ProjectActionTypes> => async (dispatch, getState) => {
    const appState = getState();

    dispatch({
      type: ActionTypes.SET_PROJECT_LOADING,
      isLoading: true
    });

    if (appState && appState.project) {
      const result = await Api.get('projects/user');

      if (result.status === 200) {
        const json = await result.json();

        dispatch({
          type: ActionTypes.SET_USER_PROJECTS,
          userProjects: json
        });
      }
    }
  },
  getCurrentProject:
    (id: Id): AppThunkAction<ProjectActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_PROJECT_LOADING,
        isLoading: true
      });

      if (appState && appState.project) {
        const result = await Api.get(`projects/${id}`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_CURRENT_PROJECT,
            currentProject: json
          });
        } else {
          dispatch({
            type: ActionTypes.SET_PROJECT_LOADING,
            isLoading: false
          });
        }
      }
    }
};

const initialState: ProjectState = {
  isLoading: false,
  currentProject: {
    name: '',
    description: '',
    code: '',
    methodology: PROJECT_METHODOLOGIES.KANBAN,
    createdAt: '',
    updatedAt: null,
    lastUpdatedAt: '',
    id: ''
  },
  userProjects: []
};

export const reducer: Reducer<ProjectState> = (
  state: ProjectState | undefined,
  incomingAction: Action
): ProjectState => {
  if (!isDefined(state)) {
    return initialState;
  }

  const action = incomingAction as ProjectActionTypes;

  switch (action.type) {
    case ActionTypes.SET_CURRENT_PROJECT:
      return {
        ...state,
        isLoading: false,
        currentProject: action.currentProject
      };
    case ActionTypes.SET_USER_PROJECTS:
      return {
        ...state,
        isLoading: false,
        userProjects: action.userProjects
      };
    case ActionTypes.SET_PROJECT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
