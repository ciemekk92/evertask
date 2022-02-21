import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

export interface ApplicationState {}

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

const composeEnhancers = composeWithDevTools({});
const rootReducer = combineReducers({});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
