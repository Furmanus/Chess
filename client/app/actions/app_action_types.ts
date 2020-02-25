import {
    APP_CREATE_GAME,
    APP_CREATE_GAME_FAILURE,
    APP_CREATE_GAME_SUCCESS,
    APP_FETCH_GAMES,
    APP_FETCH_GAMES_FAILURE,
    APP_FETCH_GAMES_SUCCESS,
    APP_FETCH_USER_SETTINGS,
    APP_FETCH_USER_SETTINGS_FAILURE,
    APP_FETCH_USER_SETTINGS_SUCCESS,
    APP_LOGOUT,
    APP_LOGOUT_FAILURE,
    APP_LOGOUT_SUCCESS
} from '../constants/app_actions';
import {GameDataWithPlayerNames, UserData} from '../../../common/interfaces/game_interfaces';

interface LogoutAction {
    type: typeof APP_LOGOUT;
}
interface LogoutSuccess {
    type: typeof APP_LOGOUT_SUCCESS;
}
interface LogoutFailure {
    type: typeof APP_LOGOUT_FAILURE;
}
interface CreateGame {
    type: typeof APP_CREATE_GAME;
}
interface CreateGameSuccess {
    type: typeof APP_CREATE_GAME_SUCCESS;
    createdGame: GameDataWithPlayerNames;
}
interface CreateGameFailure {
    type: typeof APP_CREATE_GAME_FAILURE;
}
interface FetchGames {
    type: typeof APP_FETCH_GAMES;
}
interface FetchGamesSuccess {
    type: typeof APP_FETCH_GAMES_SUCCESS;
    games: GameDataWithPlayerNames[];
}
interface FetchGamesFailure {
    type: typeof APP_FETCH_GAMES_FAILURE;
}
interface FetchUserSettings {
    type: typeof APP_FETCH_USER_SETTINGS;
}
interface FetchUserSettingsSuccess {
    type: typeof APP_FETCH_USER_SETTINGS_SUCCESS;
    userSettings: UserData;
}
interface FetchUserSettingsFailure {
    type: typeof APP_FETCH_USER_SETTINGS_FAILURE;
}

export type AppActionTypes =
    LogoutAction |
    LogoutSuccess |
    LogoutFailure |
    CreateGame |
    CreateGameSuccess |
    CreateGameFailure |
    FetchGames |
    FetchGamesSuccess |
    FetchGamesFailure |
    FetchUserSettings |
    FetchUserSettingsSuccess |
    FetchUserSettingsFailure;
