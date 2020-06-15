import * as React from 'react';
import {AppPageStyledEmptyStateContainer} from '../../styled/games/AppPageStyledEmptyStateContainer';
import {GiEmptyChessboard} from 'react-icons/gi';
import {appPageTranslations, Languages} from '../../constants/app_translations';

export class AppPageGamesEmptyState extends React.Component {
    public render(): React.ReactNode {
        return (
            <AppPageStyledEmptyStateContainer>
                <GiEmptyChessboard size="10em"/>
                <p>{appPageTranslations[Languages.EN].games.emptyState}</p>
            </AppPageStyledEmptyStateContainer>
        );
    }
}
