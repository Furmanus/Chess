import {Action} from 'redux';
import {CHANGE_FORM_ERROR, CHANGE_LOGIN_PAGE_STATE} from '../constants/actions';
import {LoginPageStates} from '../constants/login_page_states';
import {ErrorCodesToMessageKey} from '../../../common/error_codes';

interface ChangeLoginPageState extends Action<typeof CHANGE_LOGIN_PAGE_STATE> {
    mode: LoginPageStates;
}
interface ChangeFormError extends Action<typeof CHANGE_FORM_ERROR> {
    formError: keyof ErrorCodesToMessageKey;
}

export type LoginPageActionTypes = ChangeLoginPageState | ChangeFormError;
