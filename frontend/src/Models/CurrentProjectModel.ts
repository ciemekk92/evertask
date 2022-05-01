import { BehaviorSubject } from 'rxjs';
import { Project } from 'Types/Project';

const currentProjectSubject = new BehaviorSubject<Project>({
  id: '',
  createdAt: '',
  updatedAt: null,
  lastUpdatedAt: '',
  name: '',
  description: ''
});

export const CurrentProjectModel = {
  currentProjectSubject,
  currentProject: currentProjectSubject.asObservable(),
  get currentProjectValue() {
    return currentProjectSubject.value;
  }
};
