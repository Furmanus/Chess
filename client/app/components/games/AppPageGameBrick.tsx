import * as React from 'react';
import {AppPageStyledGameBrickWrapper} from '../../styled/games/AppPageStyledGameBrickWrapper';
import {GameDataWithPlayerNames} from '../../../../common/interfaces/game_interfaces';
import {translate} from '../../utils/utils';
import {appPageTranslations, Languages} from '../../constants/app_translations';
import {AppPageStyledGameBrickTurnReadyElement} from '../../styled/games/AppPageStyledGameBrickTurnReadyElement';
import {boundMethod} from 'autobind-decorator';
import {AppStyledSpan} from '../../../common/styled/AppStyledSpan';
import {AppPageGameBrickButton} from './AppPageGameBrickButton';
import {GameTableFields} from '../../../../server/enums/database';

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
            data,
        } = this.props;

        return (
            <AppPageStyledGameBrickWrapper>
                {turnReady && this.renderReadyTurnBrick()}
                {this.renderPlayers()}
                <AppPageGameBrickButton
                    gameId={data[GameTableFields.ID]}
                    disabled={disabled}
                    isCurrentUserGame={isCurrentUserGame}
                    onClick={this.onButtonClick}
                />
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
                <AppStyledSpan fontWeight="bold" fontSize="submedium">
                    {player1Name}
                </AppStyledSpan>
                <span>vs</span>
                <AppStyledSpan fontWeight="bold" fontSize="submedium">
                    {player2Name}
                </AppStyledSpan>
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
            isCurrentUserGame,
        } = this.props;

        if (!isCurrentUserGame) {
            onButtonClick(data);
        }
    }
}
