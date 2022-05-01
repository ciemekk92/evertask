import { BehaviorSubject } from 'rxjs';
import { USER_ROLES } from 'Shared/constants';

export interface IUserModel extends User.UserInfo {
  accessToken: string;
  authorities: USER_ROLES[];
}

const currentUserSubject = new BehaviorSubject<IUserModel>({
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
