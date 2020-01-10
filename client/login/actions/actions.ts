import {LoginPageStates} from '../constants/login_page_states';
import {LoginPageActionTypes} from './actionTypes';

export function changeLoginPageState(mode: LoginPageStates): LoginPageActionTypes {
    return {
        type: 'CHANGE_LOGIN_PAGE_STATE',
        mode,
    };
}
