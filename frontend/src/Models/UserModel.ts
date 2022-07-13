import { BehaviorSubject } from 'rxjs';
import { INTERFACE_LANGUAGE, USER_ROLES } from 'Shared/constants';
import { User } from 'Types/User';

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
  authorities: [],
  userSettings: {
    darkMode: false,
    interfaceLanguage: INTERFACE_LANGUAGE.EN,
    interfaceColor: '#3F51B5'
  }
});

export const UserModel = {
  currentUserSubject,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};
