import * as React from 'react';
import {AppPageStyledPageContainer} from '../styled/AppPageStyledPageContainer';
import {AppPageNavigation} from './AppPageNavigation';
import {AppPageMainSection} from './AppPageMainSection';

export class AppPage extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return (
            <AppPageStyledPageContainer>
                <AppPageNavigation/>
                <AppPageMainSection/>
            </AppPageStyledPageContainer>
        );
    }
}