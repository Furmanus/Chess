import * as React from 'react';
import {AppPageStyledPageContainer} from '../styled/AppPageStyledPageContainer';
import {AppPageNavigation} from './AppPageNavigation';
import {AppPageMainSection} from './AppPageMainSection';
import {UserData} from '../../../common/interfaces/game_interfaces';
import {AppStore} from '../reducers/app_reducer';
import {connect, ConnectedProps} from 'react-redux';
import {fetchUserSettings} from '../actions/app_actions';
import {ThunkDispatch} from 'redux-thunk';
import {AppStyledLoader} from '../../common/styled/AppStyledLoader';
import {theme} from '../../common/theme/theme';

interface AppPageStoreProps {
    userSettings: UserData;
    isFetchingUserSettings: boolean;
}
interface AppPageDispatchProps {
    fetchSettings: () => void;
}

function mapStateToProps(state: AppStore): AppPageStoreProps {
    return {
        userSettings: state.userSettings,
        isFetchingUserSettings: state.isFetchingSettings,
    };
}
function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, any>): AppPageDispatchProps {
    return {
        fetchSettings: () => {
            dispatch(fetchUserSettings());
        },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ComponentProps = PropsFromRedux;

class AppPageClass extends React.Component<ComponentProps, {}> {
    public render(): React.ReactNode {
        const {
            isFetchingUserSettings,
            userSettings,
        } = this.props;

        return (
            <React.Fragment>
                {
                    isFetchingUserSettings || !userSettings ?
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
        } = this.props;

        fetchSettings();
    }
}

export const AppPage = connector(AppPageClass);