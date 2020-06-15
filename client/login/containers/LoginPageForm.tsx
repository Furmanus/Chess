import * as React from 'react';
import {SyntheticEvent} from 'react';
import {LoginPageFormInput} from '../components/LoginPageFormInput';
import {Languages, loginPageTranslations} from '../constants/translations';
import {LoginPageStyledForm} from '../components/styled/LoginPageStyledForm';
import {boundMethod} from 'autobind-decorator';
import {LoginPageStyledSubmitButton} from '../components/styled/LoginPageStyledSubmitButton';
import {LoginPageStyledLinksSection} from '../components/styled/LoginPageStyledLinksSection';
import {IStore} from '../reducers/reducer';
import {LoginPageStates} from '../constants/login_page_states';
import {changeFormError, changeLoginPageState} from '../actions/actions';
import {connect, ConnectedProps} from 'react-redux';
import {LoginPageStyledRepeatPasswordContainer} from '../components/styled/LoginPageStyledRepeatPasswordContainer';
import {sendLoginData, sendRegisterData} from '../../api/login';
import {LoginPageStyledFormErrorContainer} from './styled/LoginPageStyledFormErrorContainer';
import {getErrorMessage} from '../utils/api_errors';
import {ErrorCodesToMessageKey} from '../../../common/error_codes';
import {ThunkDispatch} from 'redux-thunk';
import {LoginPageActionTypes} from '../actions/actionTypes';

interface ILoginFormState {
    readonly emailInputValue: string;
    readonly emailInputFocused: boolean;
    readonly passwordInputValue: string;
    readonly passwordInputFocused: boolean;
    readonly repeatPasswordInputValue: string;
    readonly repeatPasswordInputFocused: boolean;
}
interface IFormElements extends HTMLFormControlsCollection {
    login: HTMLInputElement;
    password: HTMLInputElement;
    repeatPassword: HTMLInputElement;
}
interface ILoginFormStateProps {
    mode: LoginPageStates;
    formError: keyof ErrorCodesToMessageKey;
}
interface ILoginFormDispatchProps {
    changeLoginPageMode: (mode: LoginPageStates) => void;
    changeFormError: (formError: keyof ErrorCodesToMessageKey) => void;
}

function mapStateToProps(state: IStore): ILoginFormStateProps {
    return {
        mode: state.mode,
        formError: state.formError,
    };
}
function mapDispatchToProps(dispatch: ThunkDispatch<IStore, void, LoginPageActionTypes>): ILoginFormDispatchProps {
    return {
        changeLoginPageMode: (mode: LoginPageStates) => {
            dispatch(changeLoginPageState(mode));
        },
        changeFormError: (formError: keyof ErrorCodesToMessageKey) => {
            dispatch(changeFormError(formError));
        },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

class LoginPageFormClass extends React.Component<ReduxProps, ILoginFormState> {
    public state = {
        emailInputValue: '',
        passwordInputValue: '',
        emailInputFocused: false,
        passwordInputFocused: false,
        repeatPasswordInputValue: '',
        repeatPasswordInputFocused: false,
    };
    public render(): React.ReactNode {
        const {
            emailInputValue,
            passwordInputValue,
            emailInputFocused,
            passwordInputFocused,
            repeatPasswordInputFocused,
            repeatPasswordInputValue,
        } = this.state;
        const {
            mode,
            formError,
        } = this.props;
        const submitButtonText = mode === LoginPageStates.LOGIN ?
            loginPageTranslations[Languages.EN].form.submitButtonText :
            loginPageTranslations[Languages.EN].form.submitRegisterButtonText;
        const changeLoginPageStateLinkText = mode === LoginPageStates.LOGIN ?
            loginPageTranslations[Languages.EN].links.registerAccountText :
            loginPageTranslations[Languages.EN].links.loginAccountText;
        const hasError = Boolean(formError);

        return (
            <LoginPageStyledForm
                onSubmit={this.onFormSubmit}
                action='/login'
                method='POST'
            >
                <LoginPageFormInput
                    id="login"
                    name="login"
                    type="text"
                    hasError={hasError}
                    labelText={loginPageTranslations[Languages.EN].form.emailInputLabel}
                    onChange={this.onEmailInputChange}
                    onFocus={this.onEmailInputFocus}
                    onBlur={this.onEmailInputBlur}
                    value={emailInputValue}
                    isFocused={emailInputFocused}
                />
                <LoginPageFormInput
                    id='password'
                    name="password"
                    labelText={loginPageTranslations[Languages.EN].form.passwordInputLabel}
                    type='password'
                    hasError={hasError}
                    onChange={this.onPasswordInputChange}
                    onFocus={this.onPasswordInputFocus}
                    onBlur={this.onPasswordInputBlur}
                    value={passwordInputValue}
                    isFocused={passwordInputFocused}
                />
                <LoginPageStyledRepeatPasswordContainer isVisible={mode === LoginPageStates.REGISTER}>
                    <LoginPageFormInput
                        id="repeatPassword"
                        name="repeatPassword"
                        labelText={loginPageTranslations[Languages.EN].form.repeatPasswordInputLabel}
                        type="password"
                        hasError={hasError}
                        value={repeatPasswordInputValue}
                        isFocused={repeatPasswordInputFocused}
                        onChange={this.onRepeatPasswordInputChange}
                        onFocus={this.onRepeatPasswordInputFocus}
                        onBlur={this.onRepeatPasswordInputBlur}
                    />
                </LoginPageStyledRepeatPasswordContainer>
                <LoginPageStyledSubmitButton
                    type='submit'
                >
                    {submitButtonText}
                </LoginPageStyledSubmitButton>
                <LoginPageStyledLinksSection>
                    <a
                        className='register'
                        href='#'
                        onClick={this.onRegisterLinkClick}
                    >
                        {changeLoginPageStateLinkText}
                    </a>
                </LoginPageStyledLinksSection>
                {formError && this.renderErrorContainer()}
            </LoginPageStyledForm>
        );
    }
    @boundMethod
    private onFormSubmit(e: SyntheticEvent): Promise<void> {
        const {
            changeFormError,
        } = this.props;
        const {
            elements,
        } = e.target as HTMLFormElement;
        const {
            login: loginElement,
            password: passwordElement,
            repeatPassword: repeatPasswordElement,
        } = elements as IFormElements;
        const login = loginElement?.value;
        const password = passwordElement?.value;
        const repeatedPassword = repeatPasswordElement?.value;

        e.preventDefault();

        changeFormError(null);

        return this.submitForm({
            login,
            password,
            repeatedPassword,
        });
    }
    private async submitForm(data: {login: string, password: string, repeatedPassword: string}): Promise<void> {
        const {
            mode,
            changeFormError,
        } = this.props;
        const {
            login,
            password,
            repeatedPassword,
        } = data;

        if (mode === LoginPageStates.LOGIN) {
            if (login && password) {
                try {
                    await sendLoginData(login, password);

                    window.location.pathname = '/dashboard';
                } catch (e) {
                    changeFormError(e.response.data.errorCode);
                }
            } else {
                changeFormError(1004);
            }
        } else {
            if (login && password && repeatedPassword) {
                if (password === repeatedPassword) {
                    try {
                        await sendRegisterData(login, password, repeatedPassword);

                        window.location.pathname = '/dashboard';
                    } catch (e) {
                        changeFormError(e.response.data.errorCode);
                    }
                } else {
                    changeFormError(1000);
                }
            } else {
                changeFormError(1004);
            }
        }
    }
    @boundMethod
    private onEmailInputChange(e: SyntheticEvent): void {
        const {
            value,
        } = e.target as HTMLInputElement;

        this.setState({
            emailInputValue: value,
        });
    }
    @boundMethod
    private onEmailInputFocus(): void {
        this.setState({
            emailInputFocused: true,
        });
    }
    @boundMethod
    private onEmailInputBlur(): void {
        this.setState({
            emailInputFocused: false,
        });
    }
    @boundMethod
    private onPasswordInputChange(e: SyntheticEvent): void {
        const {
            value,
        } = e.target as HTMLInputElement;

        this.setState({
            passwordInputValue: value,
        });
    }
    @boundMethod
    private onPasswordInputFocus(): void {
        this.setState({
            passwordInputFocused: true,
        });
    }
    @boundMethod
    private onPasswordInputBlur(): void {
        this.setState({
            passwordInputFocused: false,
        });
    }
    @boundMethod
    private onRepeatPasswordInputChange(e: SyntheticEvent): void {
        const {
            value,
        } = e.target as HTMLInputElement;

        this.setState({
            repeatPasswordInputValue: value,
        });
    }
    @boundMethod
    private onRepeatPasswordInputFocus(): void {
        this.setState({
            repeatPasswordInputFocused: true,
        });
    }
    @boundMethod
    private onRepeatPasswordInputBlur(): void {
        this.setState({
            repeatPasswordInputFocused: false,
        });
    }
    @boundMethod
    private onRegisterLinkClick(): void {
        const {
            changeLoginPageMode,
            changeFormError,
            mode,
        } = this.props;

        changeLoginPageMode(mode === LoginPageStates.LOGIN ? LoginPageStates.REGISTER : LoginPageStates.LOGIN);
        changeFormError(null);

        this.setState({
            emailInputValue: '',
            passwordInputValue: '',
            repeatPasswordInputValue: '',
        });
    }
    private renderErrorContainer(): React.ReactNode {
        const {
            formError,
        } = this.props;

        return (
            <LoginPageStyledFormErrorContainer>
                <span>
                    {getErrorMessage(formError)}
                </span>
            </LoginPageStyledFormErrorContainer>
        );
    }
}

export const LoginPageForm = connector(LoginPageFormClass);
