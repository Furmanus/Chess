import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {AppRoutes} from '../../common/constants/app_routes';
import {AppPageStyledMainSectionWrapper} from '../styled/AppPageStyledMainSectionWrapper';
import {AppPageGamesContainer} from './games/AppPageGamesContainer';
import {AppPageUserListContainer} from './users/AppPageUsersListContainer';
import {AppSettingsListContainer} from './settings/AppPageSettingsContainer';

export class AppPageMainSection extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return (
            <AppPageStyledMainSectionWrapper>
                <Switch>
                    <Route path={AppRoutes.GAMES}>
                        <AppPageGamesContainer/>
                    </Route>
                    <Route path={AppRoutes.SETTINGS}>
                        <AppSettingsListContainer/>
                    </Route>
                    <Route path={AppRoutes.USERS}>
                        <AppPageUserListContainer/>
                    </Route>
                </Switch>
            </AppPageStyledMainSectionWrapper>
        );
    }
}
