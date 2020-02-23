import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {AppRoutes} from '../../common/constants/app_routes';
import {AppPageStyledMainSectionWrapper} from '../styled/AppPageStyledMainSectionWrapper';
import {AppPageGamesContainer} from './games/AppPageGamesContainer';

export class AppPageMainSection extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return (
            <AppPageStyledMainSectionWrapper>
                <Switch>
                    <Route path={AppRoutes.GAMES}>
                        <AppPageGamesContainer/>
                    </Route>
                    <Route path={AppRoutes.SETTINGS}>
                        <p>settings</p>
                    </Route>
                </Switch>
            </AppPageStyledMainSectionWrapper>
        );
    }
}