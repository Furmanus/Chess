import {Action} from 'redux';
import {CHANGE_LOGIN_PAGE_STATE} from '../constants/actions';
import {LoginPageStates} from '../constants/login_page_states';

interface IChangeLoginPageState extends Action<typeof CHANGE_LOGIN_PAGE_STATE> {
    mode: LoginPageStates;
}

export type LoginPageActionTypes = IChangeLoginPageState;
