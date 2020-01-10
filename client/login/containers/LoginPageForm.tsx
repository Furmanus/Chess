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
import {Dispatch} from 'redux';
import {changeLoginPageState} from '../actions/actions';
import {connect, ConnectedProps} from 'react-redux';
import {LoginPageStyledRepeatPasswordContainer} from '../components/styled/LoginPageStyledRepeatPasswordContainer';

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
}
interface ILoginFormDispatchProps {
    changeLoginPageMode: (mode: LoginPageStates) => void;
}

function mapStateToProps(state: IStore): ILoginFormStateProps {
    return {
        mode: state.mode,
    };
}
function mapDispatchToProps(dispatch: Dispatch): ILoginFormDispatchProps {
    return {
        changeLoginPageMode: (mode: LoginPageStates) => {
            dispatch(changeLoginPageState(mode));
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
        } = this.props;
        const submitButtonText = mode === LoginPageStates.LOGIN ?
            loginPageTranslations[Languages.EN].form.submitButtonText :
            loginPageTranslations[Languages.EN].form.submitRegisterButtonText;
        const changeLoginPageStateLinkText = mode === LoginPageStates.LOGIN ?
            loginPageTranslations[Languages.EN].links.registerAccountText :
            loginPageTranslations[Languages.EN].links.loginAccountText;

        return (
            <LoginPageStyledForm
                onSubmit={this.onFormSubmit}
            >
                <LoginPageFormInput
                    id="login"
                    name="login"
                    type="text"
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
            </LoginPageStyledForm>
        );
    }
    @boundMethod
    private onFormSubmit(e: SyntheticEvent): void {
        const {
            elements,
        } = e.target as HTMLFormElement;
        const {
            login,
            password,
            repeatPassword,
        } = elements as IFormElements;

        e.preventDefault();
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
            mode,
        } = this.props;

        changeLoginPageMode(mode === LoginPageStates.LOGIN ? LoginPageStates.REGISTER : LoginPageStates.LOGIN);
        this.setState({
            emailInputValue: '',
            passwordInputValue: '',
            repeatPasswordInputValue: '',
        });
    }
}

export const LoginPageForm = connector(LoginPageFormClass);
