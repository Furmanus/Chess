import * as React from 'react';
import {LoginPageStyledHeader} from './styled/LoginPageStyledHeader';
import {MdLockOutline} from 'react-icons/md';
import {LoginPageStyledIconContainer} from './styled/LoginPageStyledIconContainer';
import {LoginPageStates} from '../constants/login_page_states';
import {Languages, loginPageTranslations} from '../constants/translations';

interface ILoginPageHeaderOwnProps {
    mode: LoginPageStates,
}

export class LoginPageHeader extends React.Component<ILoginPageHeaderOwnProps> {
    public render(): React.ReactNode {
        const headerText = loginPageTranslations[Languages.EN].header[this.props.mode];

        return (
            <LoginPageStyledHeader>
                <LoginPageStyledIconContainer>
                    <MdLockOutline
                        size='2em'
                    />
                </LoginPageStyledIconContainer>
                <h2>{headerText}</h2>
            </LoginPageStyledHeader>
        );
    }
}
