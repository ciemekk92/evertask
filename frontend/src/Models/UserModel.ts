import { BehaviorSubject } from 'rxjs';
import { USER_ROLES } from 'Shared/constants';

export interface IUserModel extends User.UserFullInfo {
  accessToken: string;
  authorities: USER_ROLES[];
}

const currentUserSubject = new BehaviorSubject<IUserModel>({
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  bio: null,
  phoneNumber: null,
  accessToken: '',
  avatar: '',
  authorities: []
});

export const UserModel = {
  currentUserSubject,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};
