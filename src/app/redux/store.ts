import { combineReducers } from 'redux';
import AppReducer from './reducers';
import { MainActions } from './actions/main';

export const mainReducer = combineReducers({
    app: AppReducer
});

export const rootReducer = (state, action) => {
    if (action.type === MainActions.CLEAR_ROOT_STATE) {
      state = undefined;
    }
    return mainReducer(state, action);
};
