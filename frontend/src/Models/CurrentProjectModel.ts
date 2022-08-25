import { BehaviorSubject } from 'rxjs';
import { PROJECT_METHODOLOGIES } from 'Shared/constants';
import { Project } from 'Types/Project';
import { Api } from '../Utils/Api';

const currentProjectSubject = new BehaviorSubject<Project.ProjectEntity>({
  id: '',
  createdAt: '',
  updatedAt: null,
  lastUpdatedAt: '',
  name: '',
  code: '',
  methodology: PROJECT_METHODOLOGIES.KANBAN,
  description: '',
  activeSprint: null,
  organisationId: ''
});

const refreshCurrentProject = async (project: Project.ProjectEntity): Promise<void> => {
  const result = await Api.get(`projects/${project.id}`);

  if (result.status === 200) {
    const json = await result.json();

    currentProjectSubject.next(json);
  }
};

export const CurrentProjectModel = {
  currentProjectSubject,
  currentProject: currentProjectSubject.asObservable(),
  get currentProjectValue() {
    return currentProjectSubject.value;
  },
  refreshCurrentProject: () => refreshCurrentProject(currentProjectSubject.value)
};
