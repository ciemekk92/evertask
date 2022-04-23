import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { UserState, reducer as userReducer } from './User';
import { ProjectState, reducer as projectReducer } from './Project';
import { IssueState, reducer as issueReducer } from './Issue';
import {
  OrganisationInvitationState,
  reducer as organisationInvitationReducer
} from './OrganisationInvitation';

export interface ApplicationState {
  user: UserState | undefined;
  project: ProjectState | undefined;
  issue: IssueState | undefined;
  organisationInvitation: OrganisationInvitationState | undefined;
}

export interface AppThunkAction<TAction> {
  (
    dispatch: (action: TAction | AppThunkAction<TAction>) => void,
    getState: () => ApplicationState
  ): void;
}

const composeEnhancers = composeWithDevTools({});
const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  issue: issueReducer,
  organisationInvitation: organisationInvitationReducer
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
