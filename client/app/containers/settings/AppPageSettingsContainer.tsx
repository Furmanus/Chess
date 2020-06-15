import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {AppPageStyledSubPageHeading} from '../../styled/games/AppPageStyledSubPageHeading';
import * as Fade from 'react-reveal/Fade';
import {AppPageStyledUsersContentWrapper} from '../../styled/users/AppPageStyledUsersContentWrapper';

const connector = connect(undefined, undefined);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ComponentProps = PropsFromRedux;

class AppPageSettingsContainerClass extends React.Component<ComponentProps> {
    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <AppPageStyledSubPageHeading/>
                <Fade>
                    <AppPageStyledUsersContentWrapper/>
                </Fade>
            </React.Fragment>
        );
    }
}

export const AppSettingsListContainer = connector(AppPageSettingsContainerClass);
