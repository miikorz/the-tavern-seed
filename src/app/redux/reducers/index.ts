import { immutableState } from '../../utils';

export const INITIAL_STATE: any = {
    loadingState: false,
    page: 'Home',
    sidenavOpen: false,
    theme: 'default-theme'
};

const AppReducer = (state = INITIAL_STATE, action: any): any => {
    switch (action.type) {
        case 'LOADING_STATE':
        case 'CHANGE_THEME':
        case 'SET_SIDENAV_OPEN':
        case 'SET_PAGE':
            return immutableState(state, action.payload);
        default:
            return state;
    }
};

export default AppReducer;
