import * as React from 'react';
import {AppStore} from '../../reducers/app_reducer';
import {connect, ConnectedProps} from 'react-redux';
import {AppPageStyledSubPageHeading} from '../../styled/games/AppPageStyledSubPageHeading';
import * as Fade from 'react-reveal/Fade';
import {AppPageStyledUsersContentWrapper} from '../../styled/users/AppPageStyledUsersContentWrapper';
import {LoggedUsersClient} from '../../../../common/interfaces/game_interfaces';
import {AppPageUserList} from '../../components/users/AppPageUserList';

interface StateProps {
    activeUsers: LoggedUsersClient;
}

function mapStateToProps(state: AppStore): StateProps {
    return {
        activeUsers: state.activeUsers,
    };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ComponentProps = PropsFromRedux;

class AppPageUsersListContainerClass extends React.Component<ComponentProps> {
    public render(): React.ReactNode {
        const {
            activeUsers,
        } = this.props;

        return (
            <React.Fragment>
                <AppPageStyledSubPageHeading/>
                <Fade>
                    <AppPageStyledUsersContentWrapper>
                        <AppPageUserList users={activeUsers}/>
                    </AppPageStyledUsersContentWrapper>
                </Fade>
            </React.Fragment>
        );
    }
}

export const AppPageUserListContainer = connector(AppPageUsersListContainerClass);
