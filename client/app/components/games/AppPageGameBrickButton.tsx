import * as React from 'react';
import {appPageTranslations, Languages} from '../../constants/app_translations';
import {AppButton} from '../../../common/components/AppButton';
import {AppRoutes} from '../../../common/constants/app_routes';
import {AppStyledHistoryLink} from '../../../common/styled/AppStyledButton';

interface AppPageGameBrickButtonProps {
    gameId: number;
    disabled: boolean;
    onClick: () => void;
    isCurrentUserGame: boolean;
}

export class AppPageGameBrickButton extends React.Component<AppPageGameBrickButtonProps> {
    public render(): React.ReactNode {
        const {
            gameId,
            disabled,
            onClick,
            isCurrentUserGame,
        } = this.props;

        if (isCurrentUserGame) {
            return (
                <AppStyledHistoryLink
                    to={{
                        pathname: `${AppRoutes.BOARD}/${gameId}`,
                    }}
                    width={118}
                    height={36}
                    fontSize='submedium'
                    variation='ghost'
                    disabled={disabled}
                    onClick={onClick}
                >
                    <span>{appPageTranslations[Languages.EN].games.gameBox.button.userGame}</span>
                </AppStyledHistoryLink>
            );
        }

        return (
            <AppButton
                type="button"
                width={118}
                height={36}
                fontSize='submedium'
                variation='ghost'
                disabled={disabled}
                onClick={onClick}
            >
                <span>
                    {appPageTranslations[Languages.EN].games.gameBox.button.vacantGame}
                </span>
            </AppButton>
        );
    }
}
