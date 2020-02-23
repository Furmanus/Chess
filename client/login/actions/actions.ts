import {LoginPageStates} from '../constants/login_page_states';
import {LoginPageActionTypes} from './actionTypes';
import {
    CHANGE_FORM_ERROR,
    CHANGE_LOGIN_PAGE_STATE,
} from '../constants/actions';
import {ErrorCodesToMessageKey} from '../../../common/error_codes';

export function changeLoginPageState(mode: LoginPageStates): LoginPageActionTypes {
    return {
        type: CHANGE_LOGIN_PAGE_STATE,
        mode,
    };
}
export function changeFormError(error: keyof ErrorCodesToMessageKey): LoginPageActionTypes {
    return {
        type: CHANGE_FORM_ERROR,
        formError: error,
    };
}