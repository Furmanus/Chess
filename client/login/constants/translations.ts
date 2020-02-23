export const enum Languages {
    EN = 'en',
}
const englishTranslations = {
    header: {
        login: 'Sign in',
        register: 'Sign up',
    },
    form: {
        emailInputLabel: 'Email Address',
        passwordInputLabel: 'Password',
        repeatPasswordInputLabel: 'Repeat Password',
        submitButtonText: 'sign in',
        submitRegisterButtonText: 'sign up',
        errors: {
            internalServerError: 'Unexpected server error, please try again later',
            registerUserAlreadyExists: 'User already exists',
            registerPasswordsDontMatch: 'Repeated password is not same as password',
            loginUserNotFound: 'Wrong user name or password',
            loginWrongPassword: 'Wrong user name or password',
            fieldsNotFilled: 'Please fill all fields',
        },
    },
    links: {
        retrievePasswordText: 'Forgot password?',
        registerAccountText: 'Don\'t have an account? Sign up',
        loginAccountText: 'Already have account? Sign in'
    }
};
export const loginPageTranslations = {
    [Languages.EN]: englishTranslations,
};

