import { Action, Reducer } from 'redux';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { CURRENT_PROJECT_KEY, PROJECT_METHODOLOGIES } from 'Shared/constants';
import { Project } from 'Types/Project';
import { Issue } from 'Types/Issue';
import { Sprint } from 'Types/Sprint';
import { User } from 'Types/User';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { ActionTypes } from './constants';
import { AppThunkAction } from './store';

export interface ProjectState {
  organisationProjects: Project.ProjectEntity[];
  selectedProject: Project.ProjectEntity;
  activeMembers: User.UserEntity[];
  sprints: Sprint.SprintEntity[];
  notCompletedSprints: Sprint.SprintIssuesEntity[];
  completedSprints: Sprint.SprintIssuesEntity[];
  lastIssues: Issue.IssueFullEntity[];
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

interface SetProjectCompletedSprints {
  type: typeof ActionTypes.SET_COMPLETED_SPRINTS;
  completedSprints: Sprint.SprintIssuesEntity[];
}

interface SetProjectLastIssues {
  type: typeof ActionTypes.SET_PROJECT_LAST_ISSUES;
  lastIssues: Issue.IssueFullEntity[];
}

export type ProjectActionTypes =
  | SetOrganisationProjectsAction
  | SetSelectedProjectAction
  | SetActiveProjectMembersAction
  | SetProjectSprints
  | SetProjectNotCompletedSprints
  | SetProjectCompletedSprints
  | SetProjectLastIssues;

export const actionCreators = {
  getOrganisationsProjects:
    (): AppThunkAction<ProjectActionTypes> => async (dispatch, getState) => {
      const appState = getState();

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

      if (appState && appState.project) {
        const result = await Api.get(`projects/${id}`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_SELECTED_PROJECT,
            selectedProject: json
          });
        }
      }
    },
  getActiveMembers:
    (id: Id): AppThunkAction<ProjectActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.project) {
        const result = await Api.get(`projects/${id}/active_members`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_PROJECT_ACTIVE_MEMBERS,
            activeMembers: json
          });
        }
      }
    },
  getSprints:
    (id: Id): AppThunkAction<ProjectActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.project && id.length) {
        const result = await Api.get(`projects/${id}/sprints`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_PROJECT_SPRINTS,
            sprints: json
          });
        }
      }
    },
  getNotCompletedSprints:
    (id: Id): AppThunkAction<ProjectActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.project) {
        const result = await Api.get(`projects/${id}/sprints_not_completed`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_NOT_COMPLETED_SPRINTS,
            notCompletedSprints: json
          });
        }
      }
    },
  getCompletedSprints:
    (id: Id): AppThunkAction<ProjectActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.project) {
        const result = await Api.get(`projects/${id}/sprints_completed`);

        console.log({ result });
        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_COMPLETED_SPRINTS,
            completedSprints: json
          });
        }
      }
    },
  getLastIssues:
    (id: Id): AppThunkAction<ProjectActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      if (appState && appState.project) {
        const result = await Api.get(`projects/${id}/last_issues`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_PROJECT_LAST_ISSUES,
            lastIssues: json
          });
        }
      }
    }
};

const initialState: ProjectState = {
  selectedProject: {
    name: '',
    description: '',
    code: '',
    methodology: PROJECT_METHODOLOGIES.KANBAN,
    createdAt: '',
    updatedAt: null,
    lastUpdatedAt: '',
    activeSprint: null,
    id: '',
    organisationId: ''
  },
  organisationProjects: [],
  activeMembers: [],
  sprints: [],
  notCompletedSprints: [],
  completedSprints: [],
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
        selectedProject: action.selectedProject
      };
    case ActionTypes.SET_ORGANISATION_PROJECTS:
      return {
        ...state,
        organisationProjects: action.organisationProjects
      };
    case ActionTypes.SET_PROJECT_ACTIVE_MEMBERS:
      return {
        ...state,
        activeMembers: action.activeMembers
      };
    case ActionTypes.SET_PROJECT_SPRINTS:
      return {
        ...state,
        sprints: action.sprints
      };
    case ActionTypes.SET_PROJECT_LAST_ISSUES:
      return {
        ...state,
        lastIssues: action.lastIssues
      };
    case ActionTypes.SET_NOT_COMPLETED_SPRINTS:
      return {
        ...state,
        notCompletedSprints: action.notCompletedSprints
      };
    case ActionTypes.SET_COMPLETED_SPRINTS:
      return {
        ...state,
        completedSprints: action.completedSprints
      };
    default:
      return state;
  }
};
