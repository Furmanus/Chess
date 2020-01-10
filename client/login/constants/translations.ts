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

