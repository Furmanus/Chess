import {AppStore} from '../reducers/app_reducer';
import {GameDataWithPlayerNames, UserData} from '../../../common/interfaces/game_interfaces';
import {createSelector} from 'reselect';
import {GameTableFields} from '../../../server/enums/database';
import {GamesFilter} from '../constants/app_games';

export function getGames(state: AppStore): GameDataWithPlayerNames[] {
    return state.games;
}
export function getSettings(state: AppStore): UserData {
    return state.userSettings;
}
export function getGamesFilter(state: AppStore): GamesFilter {
    return state.gamesFilter;
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
