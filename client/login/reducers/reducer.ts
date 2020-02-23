import {LoginPageStates} from '../constants/login_page_states';
import {LoginPageActionTypes} from '../actions/actionTypes';
import {CHANGE_FORM_ERROR, CHANGE_LOGIN_PAGE_STATE} from '../constants/actions';
import {ErrorCodesToMessageKey} from '../../../common/error_codes';

export interface IStore {
    mode: LoginPageStates;
    formError: keyof ErrorCodesToMessageKey;
}

const initialState: IStore = {
    mode: LoginPageStates.LOGIN,
    formError: null
};

export function loginPageReducer(state = initialState, action: LoginPageActionTypes): IStore {
    if (!action) {
        return state;
    }

    switch(action.type) {
        case CHANGE_LOGIN_PAGE_STATE:
            return {
                ...state,
                mode: action.mode,
            };
        case CHANGE_FORM_ERROR:
            return {
                ...state,
                formError: action.formError,
            };
        default:
            return state;
    }
}