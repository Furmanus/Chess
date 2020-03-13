import * as React from 'react';
import {SyntheticEvent} from 'react';
import {AppPageStyledGameBrickWrapper} from '../../styled/games/AppPageStyledGameBrickWrapper';
import {GameDataWithPlayerNames} from '../../../../common/interfaces/game_interfaces';
import {translate} from '../../utils/utils';
import {appPageTranslations, Languages} from '../../constants/app_translations';
import {AppButton} from '../../../common/components/AppButton';
import {AppPageStyledGameBrickTurnReadyElement} from '../../styled/games/AppPageStyledGameBrickTurnReadyElement';
import {boundMethod} from 'autobind-decorator';

interface AppPageBrickProps {
    data: GameDataWithPlayerNames;
    isCurrentUserGame: boolean;
    disabled: boolean;
    turnReady: boolean;
    onButtonClick: (game: GameDataWithPlayerNames) => void;
}

export class AppPageGameBrick extends React.Component<AppPageBrickProps, {}> {
    public render(): React.ReactNode {
        const {
            disabled,
            turnReady,
            isCurrentUserGame,
        } = this.props;

        return (
            <AppPageStyledGameBrickWrapper>
                {turnReady && this.renderReadyTurnBrick()}
                {this.renderPlayers()}
                <AppButton
                    type="button"
                    width={118}
                    height={36}
                    fontSize='submedium'
                    variation='ghost'
                    disabled={disabled}
                    onClick={this.onButtonClick}
                >
                    {isCurrentUserGame ?
                        appPageTranslations[Languages.EN].games.gameBox.button.userGame :
                        appPageTranslations[Languages.EN].games.gameBox.button.vacantGame
                    }
                </AppButton>
            </AppPageStyledGameBrickWrapper>
        );
    }
    private renderPlayers(): React.ReactNode {
        let {
            player1Name,
            player2Name,
        } = this.props.data;

        if (!player2Name) {
            return (
                <span>
                    {translate(appPageTranslations[Languages.EN].games.gameBox.onlyFirstPlayer, {
                        player1: player1Name,
                    })}
                </span>
            )
        }

        return (
            <div className="players">
                <span>{player1Name}</span>
                <span>vs</span>
                <span>{player2Name}</span>
            </div>
        );
    }
    private renderReadyTurnBrick(): React.ReactNode {
        return (
            <AppPageStyledGameBrickTurnReadyElement>
                {appPageTranslations[Languages.EN].games.gameBox.turnReady}
            </AppPageStyledGameBrickTurnReadyElement>
        );
    }
    @boundMethod
    private onButtonClick(): void {
        const {
            onButtonClick,
            data,
        } = this.props;

        onButtonClick(data);
    }
}
