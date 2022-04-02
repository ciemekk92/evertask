import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { UserState, reducer as userReducer } from './User';
import { ProjectState, reducer as projectReducer } from './Project';
import { IssueState, reducer as issueReducer } from './Issue';

export interface ApplicationState {
  user: UserState | undefined;
  project: ProjectState | undefined;
  issue: IssueState | undefined;
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
  issue: issueReducer
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
