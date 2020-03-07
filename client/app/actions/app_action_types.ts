import {
    APP_CREATE_GAME,
    APP_CREATE_GAME_FAILURE,
    APP_CREATE_GAME_SUCCESS,
    APP_FETCH_ACTIVE_USERS,
    APP_FETCH_ACTIVE_USERS_FAILURE,
    APP_FETCH_ACTIVE_USERS_SUCCESS,
    APP_FETCH_GAMES,
    APP_FETCH_GAMES_FAILURE,
    APP_FETCH_GAMES_SUCCESS,
    APP_FETCH_USER_SETTINGS,
    APP_FETCH_USER_SETTINGS_FAILURE,
    APP_FETCH_USER_SETTINGS_SUCCESS,
    APP_FILTER_CHANGE,
    APP_LOGOUT,
    APP_LOGOUT_FAILURE,
    APP_LOGOUT_SUCCESS,
    APP_USER_DISCONNECTED,
    APP_USER_JOINED,
} from '../constants/app_actions';
import {
    GameDataWithPlayerNames,
    LoggedUsers,
    UserData,
} from '../../../common/interfaces/game_interfaces';
import {GamesFilter} from '../constants/app_games';

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
interface FetchActiveUsers {
    type: typeof APP_FETCH_ACTIVE_USERS;
}
interface FetchActiveUsersSuccess {
    type: typeof APP_FETCH_ACTIVE_USERS_SUCCESS;
    activeUsers: LoggedUsers;
}
interface FetchActiveUsersFailure {
    type: typeof APP_FETCH_ACTIVE_USERS_FAILURE;
}
interface AddUserToActiveUsers {
    type: typeof APP_USER_JOINED;
    user: UserData;
}
interface RemoveUserFromActiveUsers {
    type: typeof APP_USER_DISCONNECTED;
    userId: string;
}
interface ChangeFilter {
    type: typeof APP_FILTER_CHANGE;
    gamesFilter: GamesFilter;
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
    FetchUserSettingsFailure |
    FetchActiveUsers |
    FetchActiveUsersSuccess |
    FetchActiveUsersFailure |
    AddUserToActiveUsers |
    RemoveUserFromActiveUsers |
    ChangeFilter;
