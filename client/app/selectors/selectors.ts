import {AppStore} from '../reducers/app_reducer';
import {GameDataWithPlayerNames, UserData} from '../../../common/interfaces/game_interfaces';
import {createSelector} from 'reselect';
import {GameTableFields} from '../../../server/enums/database';
import {GamesFilter} from '../constants/app_games';
import {PlayerColors} from '../../../common/helpers/game_helper';

export function getGames(state: AppStore): GameDataWithPlayerNames[] {
    return state.games;
}
export function getSettings(state: AppStore): UserData {
    return state.userSettings;
}
export function getGamesFilter(state: AppStore): GamesFilter {
    return state.gamesFilter;
}
export function getActiveGame(state: AppStore): GameDataWithPlayerNames {
    return state.activeGame;
}
export const getChoosenGames = createSelector(
    [getGames, getSettings, getGamesFilter],
    (games: GameDataWithPlayerNames[], settings: UserData, gamesFilter: GamesFilter) => {
        const userId = settings.id;

        switch (gamesFilter) {
            case GamesFilter.User:
                return games.filter((game: GameDataWithPlayerNames) => {
                    return game[GameTableFields.PLAYER1_ID] === userId || game[GameTableFields.PLAYER2_ID] === userId;
                });
            case GamesFilter.Vacant:
                return games.filter((game: GameDataWithPlayerNames) => {
                    return game[GameTableFields.PLAYER2_ID] === null && game[GameTableFields.PLAYER1_ID] !== userId;
                });
            case GamesFilter.All:
                return games;
        }
    },
);
export const getCurrentPlayerColor = createSelector(
    [getActiveGame, getSettings],
    (game: GameDataWithPlayerNames, settings: UserData) => {
        const {
            id,
        } = settings;
        let playerColor: PlayerColors;

        if (game?.[GameTableFields.PLAYER1_ID] === id) {
            playerColor = PlayerColors.WHITE;
        } else if (game?.[GameTableFields.PLAYER2_ID] === id) {
            playerColor = PlayerColors.BLACK;
        }

        return playerColor;
    },
);