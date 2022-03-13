import { BehaviorSubject } from 'rxjs';
import { UserInfo } from 'Stores/User';

interface User extends UserInfo {
  accessToken: string;
}

const currentUserSubject = new BehaviorSubject<User>({
  username: '',
  firstName: '',
  lastName: '',
  accessToken: ''
});

export const UserModel = {
  currentUserSubject,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};
