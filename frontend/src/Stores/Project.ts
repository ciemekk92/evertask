import { Action, Reducer } from 'redux';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { CURRENT_PROJECT_KEY, PROJECT_METHODOLOGIES } from 'Shared/constants';
import { Project } from 'Types/Project';
import { Issue } from 'Types/Issue';
import { Sprint } from 'Types/Sprint';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { ActionTypes } from './constants';
import { AppThunkAction } from './store';

export interface ProjectState {
  isLoading: boolean;
  organisationProjects: Project.ProjectEntity[];
  selectedProject: Project.ProjectEntity;
  activeMembers: User.UserEntity[];
  sprints: Sprint.SprintEntity[];
  notCompletedSprints: Sprint.SprintIssuesEntity[];
  lastIssues: Issue.IssueEntity[];
}

interface SetOrganisationProjectsAction {
  type: typeof ActionTypes.SET_ORGANISATION_PROJECTS;
  organisationProjects: Project.ProjectEntity[];
}

interface SetSelectedProjectAction {
  type: typeof ActionTypes.SET_SELECTED_PROJECT;
  selectedProject: Project.ProjectEntity;
}

interface SetActiveProjectMembersAction {
  type: typeof ActionTypes.SET_PROJECT_ACTIVE_MEMBERS;
  activeMembers: User.UserEntity[];
}

interface SetProjectSprints {
  type: typeof ActionTypes.SET_PROJECT_SPRINTS;
  sprints: Sprint.SprintEntity[];
}

interface SetProjectNotCompletedSprints {
  type: typeof ActionTypes.SET_NOT_COMPLETED_SPRINTS;
  notCompletedSprints: Sprint.SprintIssuesEntity[];
}

interface SetProjectLastIssues {
  type: typeof ActionTypes.SET_PROJECT_LAST_ISSUES;
  lastIssues: Issue.IssueEntity[];
}

interface SetProjectLoadingAction {
  type: typeof ActionTypes.SET_PROJECT_LOADING;
  isLoading: boolean;
}

export type ProjectActionTypes =
  | SetOrganisationProjectsAction
  | SetSelectedProjectAction
  | SetActiveProjectMembersAction
  | SetProjectSprints
  | SetProjectNotCompletedSprints
  | SetProjectLastIssues
  | SetProjectLoadingAction;

export const actionCreators = {
  getOrganisationsProjects:
    (): AppThunkAction<ProjectActionTypes> => async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_PROJECT_LOADING,
        isLoading: true
      });

      if (appState && appState.project) {
        const result = await Api.get('projects/organisation');

        if (result.status === 200) {
          const localProject = localStorage.getItem(CURRENT_PROJECT_KEY) as Nullable<Id>;
          const json = await result.json();

          if (json.length && !CurrentProjectModel.currentProjectValue.id) {
            if (localProject) {
              const project = json.find((el: Project.ProjectEntity) => localProject === el.id);

              if (project) {
                CurrentProjectModel.currentProjectSubject.next(project);
              }
            } else {
              CurrentProjectModel.currentProjectSubject.next(json[0]);
            }
          }

          dispatch({
            type: ActionTypes.SET_ORGANISATION_PROJECTS,
            organisationProjects: json
          });
        }
      }
    },
  getSelectedProject:
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
            type: ActionTypes.SET_SELECTED_PROJECT,
            selectedProject: json
          });
        } else {
          dispatch({
            type: ActionTypes.SET_PROJECT_LOADING,
            isLoading: false
          });
        }
      }
    },
  getActiveMembers:
    (id: Id): AppThunkAction<ProjectActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_PROJECT_LOADING,
        isLoading: true
      });

      if (appState && appState.project) {
        const result = await Api.get(`projects/${id}/active_members`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_PROJECT_ACTIVE_MEMBERS,
            activeMembers: json
          });
        } else {
          dispatch({
            type: ActionTypes.SET_PROJECT_LOADING,
            isLoading: false
          });
        }
      }
    },
  getSprints:
    (id: Id): AppThunkAction<ProjectActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_PROJECT_LOADING,
        isLoading: true
      });

      if (appState && appState.project) {
        const result = await Api.get(`projects/${id}/sprints`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_PROJECT_SPRINTS,
            sprints: json
          });
        } else {
          dispatch({
            type: ActionTypes.SET_PROJECT_LOADING,
            isLoading: false
          });
        }
      }
    },
  getNotCompletedSprints:
    (id: Id): AppThunkAction<ProjectActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_PROJECT_LOADING,
        isLoading: true
      });

      if (appState && appState.project) {
        const result = await Api.get(`projects/${id}/sprints_not_completed`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_NOT_COMPLETED_SPRINTS,
            notCompletedSprints: json
          });
        } else {
          dispatch({
            type: ActionTypes.SET_PROJECT_LOADING,
            isLoading: false
          });
        }
      }
    },
  getLastIssues:
    (id: Id): AppThunkAction<ProjectActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      dispatch({
        type: ActionTypes.SET_PROJECT_LOADING,
        isLoading: true
      });

      if (appState && appState.project) {
        const result = await Api.get(`projects/${id}/last_issues`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_PROJECT_LAST_ISSUES,
            lastIssues: json
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
  selectedProject: {
    name: '',
    description: '',
    code: '',
    methodology: PROJECT_METHODOLOGIES.KANBAN,
    createdAt: '',
    updatedAt: null,
    lastUpdatedAt: '',
    activeSprint: null,
    id: ''
  },
  organisationProjects: [],
  activeMembers: [],
  sprints: [],
  notCompletedSprints: [],
  lastIssues: []
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
    case ActionTypes.SET_SELECTED_PROJECT:
      return {
        ...state,
        isLoading: false,
        selectedProject: action.selectedProject
      };
    case ActionTypes.SET_ORGANISATION_PROJECTS:
      return {
        ...state,
        isLoading: false,
        organisationProjects: action.organisationProjects
      };
    case ActionTypes.SET_PROJECT_ACTIVE_MEMBERS:
      return {
        ...state,
        isLoading: false,
        activeMembers: action.activeMembers
      };
    case ActionTypes.SET_PROJECT_SPRINTS:
      return {
        ...state,
        isLoading: false,
        sprints: action.sprints
      };
    case ActionTypes.SET_PROJECT_LAST_ISSUES:
      return {
        ...state,
        isLoading: false,
        lastIssues: action.lastIssues
      };
    case ActionTypes.SET_NOT_COMPLETED_SPRINTS:
      return {
        ...state,
        isLoading: false,
        notCompletedSprints: action.notCompletedSprints
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
