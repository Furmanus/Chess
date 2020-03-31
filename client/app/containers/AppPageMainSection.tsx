import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {AppRoutes} from '../../common/constants/app_routes';
import {AppPageStyledMainSectionWrapper} from '../styled/AppPageStyledMainSectionWrapper';
import {AppPageGamesContainer} from './games/AppPageGamesContainer';
import {AppPageUserListContainer} from './users/AppPageUsersListContainer';
import {AppSettingsListContainer} from './settings/AppPageSettingsContainer';
import {AppPageGameBoardContainer} from './game_board/AppPageGameBoardContainer';

export class AppPageMainSection extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return (
            <AppPageStyledMainSectionWrapper>
                <Switch>
                    <Route
                        path={AppRoutes.GAMES}
                        component={AppPageGamesContainer}
                    />
                    <Route
                        path={AppRoutes.SETTINGS}
                        component={AppSettingsListContainer}
                    />
                    <Route
                        path={AppRoutes.USERS}
                        component={AppPageUserListContainer}
                    />
                    <Route
                        path={`${AppRoutes.BOARD}/:gameId`}
                        component={AppPageGameBoardContainer}
                    />
                </Switch>
            </AppPageStyledMainSectionWrapper>
        );
    }
}
