import { BehaviorSubject } from 'rxjs';
import { PROJECT_METHODOLOGIES } from 'Shared/constants';
import { Project } from 'Types/Project';

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

export const CurrentProjectModel = {
  currentProjectSubject,
  currentProject: currentProjectSubject.asObservable(),
  get currentProjectValue() {
    return currentProjectSubject.value;
  }
};
