import * as React from 'react';
import {AppPageStyledPageNavigationList} from '../styled/AppPageStyledNavigationList';
import {appPageTranslations, Languages} from '../constants/app_translations';
import {FaChess, FaUsers} from 'react-icons/fa';
import {IoIosLogOut, MdSettings} from 'react-icons/all';
import {Link} from 'react-router-dom'
import {AppRoutes} from '../../common/constants/app_routes';
import {connect, ConnectedProps} from 'react-redux';
import {logout} from '../actions/app_actions';
import {boundMethod} from 'autobind-decorator';
import {AppThunkDispatch} from '../interfaces/thunk';

interface AppPageNavigationListDispatchProps {
    logout: () => void;
}

function mapDispatchToProps(dispatch: AppThunkDispatch): AppPageNavigationListDispatchProps {
    return {
        logout: () => {
            dispatch(logout());
        },
    };
}

const connector = connect(undefined, mapDispatchToProps);

type ComponentProps = ConnectedProps<typeof connector>;

class AppPageNavigationListClass extends React.Component<ComponentProps> {
    public render(): React.ReactNode {
        return (
            <AppPageStyledPageNavigationList>
                <ul>
                    <li>
                        <Link to={AppRoutes.GAMES}>
                            <FaChess/>
                            <span>{appPageTranslations[Languages.EN].navigation.games}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={AppRoutes.SETTINGS}>
                            <MdSettings/>
                            <span>{appPageTranslations[Languages.EN].navigation.settings}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={AppRoutes.USERS}>
                            <FaUsers/>
                            <span>{appPageTranslations[Languages.EN].navigation.users}</span>
                        </Link>
                    </li>
                    <li onClick={this.onLogoutClick}>
                        <a href="#">
                            <IoIosLogOut/>
                           <span>{appPageTranslations[Languages.EN].navigation.logout}</span>
                        </a>
                    </li>
                </ul>
            </AppPageStyledPageNavigationList>
        );
    }
    @boundMethod
    private onLogoutClick(): void {
        const {
            logout,
        } = this.props;

        logout();
    }
}

export const AppPageNavigationList = connector(AppPageNavigationListClass);
