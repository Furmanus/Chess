import * as React from 'react';
import {AppPageStyledPageContainer} from '../styled/AppPageStyledPageContainer';
import {AppPageNavigation} from './AppPageNavigation';
import {AppPageMainSection} from './AppPageMainSection';
import {UserData} from '../../../common/interfaces/game_interfaces';
import {AppStore} from '../reducers/app_reducer';
import {connect, ConnectedProps} from 'react-redux';
import {
    fetchActiveUsers as fetchActiveUsersAction,
    fetchUserSettings,
} from '../actions/app_actions';
import {AppStyledLoader} from '../../common/styled/AppStyledLoader';
import {theme} from '../../common/theme/theme';
import {AppThunkDispatch} from '../interfaces/thunk';

interface AppPageStoreProps {
    userSettings: UserData;
    isFetchingUserSettings: boolean;
    isFetchingUsers: boolean;
}
interface AppPageDispatchProps {
    fetchSettings: () => void;
    fetchActiveUsers: () => void;
}

function mapStateToProps(state: AppStore): AppPageStoreProps {
    return {
        userSettings: state.userSettings,
        isFetchingUserSettings: state.isFetchingSettings,
        isFetchingUsers: state.isFetchingUsers,
    };
}
function mapDispatchToProps(dispatch: AppThunkDispatch): AppPageDispatchProps {
    return {
        fetchSettings: () => {
            dispatch(fetchUserSettings());
        },
        fetchActiveUsers: () => {
            dispatch(fetchActiveUsersAction());
        },
    };
}

const connector = connect<AppPageStoreProps, AppPageDispatchProps>(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ComponentProps = PropsFromRedux;

class AppPageClass extends React.Component<ComponentProps> {
    public render(): React.ReactNode {
        const {
            isFetchingUserSettings,
            isFetchingUsers,
            userSettings,
        } = this.props;

        return (
            <React.Fragment>
                {
                    isFetchingUserSettings || isFetchingUsers || !userSettings ?
                        <AppStyledLoader
                            type="RevolvingDot"
                            color={theme.color.background.darkblue}
                            width={150}
                            height={150}
                        /> :
                        <AppPageStyledPageContainer>
                            <AppPageNavigation/>
                            <AppPageMainSection/>
                        </AppPageStyledPageContainer>
                }
            </React.Fragment>
        );
    }
    public componentDidMount(): void {
        const {
            fetchSettings,
            fetchActiveUsers,
        } = this.props;

        fetchSettings();
        fetchActiveUsers();
    }
}

export const AppPage = connector(AppPageClass);
