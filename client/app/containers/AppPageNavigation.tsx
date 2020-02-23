import * as React from 'react';
import {AppPageStyledPageNavigationContainer} from '../styled/AppPageStyledPageNavigationContainer';
import {FaChessKnight} from 'react-icons/fa';
import {AppPageStyledPageNavigationHeading} from '../styled/AppPageStyledPageNavigationHeading';
import {AppPageNavigationList} from '../components/AppPageNavigationList';

export class AppPageNavigation extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return (
            <AppPageStyledPageNavigationContainer>
                <AppPageStyledPageNavigationHeading>
                    <FaChessKnight
                        size="3em"
                    />
                </AppPageStyledPageNavigationHeading>
                <AppPageNavigationList/>
            </AppPageStyledPageNavigationContainer>
        );
    }
}