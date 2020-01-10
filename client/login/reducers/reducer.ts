import {LoginPageStates} from '../constants/login_page_states';
import {LoginPageActionTypes} from '../actions/actionTypes';

export interface IStore {
    mode: LoginPageStates;
}

const initialState: IStore = {
    mode: LoginPageStates.LOGIN,
};

export function loginPageReducer(state = initialState, action: LoginPageActionTypes): IStore {
    if (!action) {
        return state;
    }

    switch(action.type) {
        case 'CHANGE_LOGIN_PAGE_STATE':
            return {
                ...state,
                mode: action.mode,
            };
        default:
            return state;
    }
}