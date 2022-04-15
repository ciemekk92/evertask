import { BehaviorSubject } from 'rxjs';
import { UserInfo } from 'Stores/User';
import { USER_ROLES } from 'Shared/constants';

export interface User extends UserInfo {
  accessToken: string;
  authorities: USER_ROLES[];
}

const currentUserSubject = new BehaviorSubject<User>({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  accessToken: '',
  authorities: []
});

export const UserModel = {
  currentUserSubject,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};
