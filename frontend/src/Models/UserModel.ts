import { BehaviorSubject } from 'rxjs';
import { UserInfo } from 'Stores/User';

export interface User extends UserInfo {
  accessToken: string;
}

const currentUserSubject = new BehaviorSubject<User>({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  accessToken: ''
});

export const UserModel = {
  currentUserSubject,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};
