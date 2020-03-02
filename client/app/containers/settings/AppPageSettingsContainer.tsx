import * as React from 'react';
import {AppStore} from '../../reducers/app_reducer';
import {connect, ConnectedProps} from 'react-redux';
import {AppPageStyledSubPageHeading} from '../../styled/games/AppPageStyledSubPageHeading';
// @ts-ignore
import * as Fade from 'react-reveal/Fade';
import {AppPageStyledUsersContentWrapper} from '../../styled/users/AppPageStyledUsersContentWrapper';

interface StateProps {
}

function mapStateToProps(state: AppStore): StateProps {
    return {
    };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ComponentProps = PropsFromRedux;

class AppPageSettingsContainerClass extends React.Component<ComponentProps, {}> {
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