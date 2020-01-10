import * as React from 'react';
import {LoginPageHeader} from '../components/LoginPageHeader';
import {LoginPageForm} from './LoginPageForm';
import {LoginPageStyledFooter} from '../components/styled/LoginPageStyledFooter';
import {IStore} from '../reducers/reducer';
import {LoginPageStates} from '../constants/login_page_states';
import {connect} from 'react-redux';

interface ILoginPageStateProps {
    mode: LoginPageStates;
}

function mapStateToProps(state: IStore): ILoginPageStateProps {
    return {
        mode: state.mode,
    };
}

const connector = connect(mapStateToProps);

class LoginPageClass extends React.Component<ILoginPageStateProps> {
    public render(): React.ReactNode {
        const {
            mode,
        } = this.props;

        return (
            <React.Fragment>
                <LoginPageHeader mode={mode}/>
                <LoginPageForm/>
                <LoginPageStyledFooter>
                    Copyright &copy; Łukasz Lach 2020
                </LoginPageStyledFooter>
            </React.Fragment>
        );
    }
}

export const LoginPage = connector(LoginPageClass);
