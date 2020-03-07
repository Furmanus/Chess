import {AppActionTypes} from './app_action_types';
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
import {Action, Dispatch} from 'redux';
import {logoutRequest} from '../../api/login';
import {ThunkAction} from 'redux-thunk';
import {AppStore} from '../reducers/app_reducer';
import {AppThunkAction} from '../interfaces/thunk';
import {
    createGame as createGameApi,
    fetchActiveUsers as fetchActiveUsersApi,
    fetchUserAndVacantGames as fetchGamesApi,
    fetchUserSettings as fetchUserSettingsApi,
} from '../../api/app';
import {GameDataWithPlayerNames, LoggedUsers, UserData} from '../../../common/interfaces/game_interfaces';
import {GamesFilter} from '../constants/app_games';

export function logout(): ThunkAction<void, AppStore, null, Action<string>> {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: APP_LOGOUT,
        });

        try {
            await logoutRequest();

            dispatch(logoutSuccess());
        } catch {
            dispatch(logoutFailure());
        }
    };
}
export function logoutSuccess(): AppActionTypes {
    window.location.pathname = '/login';

    return {
        type: APP_LOGOUT_SUCCESS,
    };
}
export function logoutFailure(): AppActionTypes {
    // TODO error notification
    return {
        type: APP_LOGOUT_FAILURE,
    };
}
export function createGame(): AppThunkAction {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: APP_CREATE_GAME,
        });

        try {
            const response = await createGameApi();

            dispatch(createGameSuccess(response.data));
        } catch (error) {
            dispatch(createGameFailure());
        }
    };
}
export function createGameSuccess(gameData: GameDataWithPlayerNames): AppActionTypes {
    return {
        type: APP_CREATE_GAME_SUCCESS,
        createdGame: gameData,
    };
}
export function createGameFailure(): AppActionTypes {
    return {
        type: APP_CREATE_GAME_FAILURE,
    };
}
export function fetchGames(): AppThunkAction {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: APP_FETCH_GAMES,
        });

        try {
            const response = await fetchGamesApi();

            dispatch(fetchGamesSuccess(response.data));
        } catch(e) {
            dispatch(fetchGamesFailure());
        }
    };
}
function fetchGamesSuccess(games: GameDataWithPlayerNames[]): AppActionTypes {
    return {
        type: APP_FETCH_GAMES_SUCCESS,
        games,
    };
}
function fetchGamesFailure(): AppActionTypes {
    return {
        type: APP_FETCH_GAMES_FAILURE,
    };
}
export function fetchUserSettings(): AppThunkAction {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: APP_FETCH_USER_SETTINGS,
        });

        try {
            const response = await fetchUserSettingsApi();

            dispatch(fetchUserSettingsSuccess(response.data));
        } catch(e) {
            dispatch(fetchUserSettingsFailure());
        }
    };
}
function fetchUserSettingsSuccess(settings: UserData): AppActionTypes {
    return {
        type: APP_FETCH_USER_SETTINGS_SUCCESS,
        userSettings: settings,
    };
}
function fetchUserSettingsFailure() {
    return {
        type: APP_FETCH_USER_SETTINGS_FAILURE,
    };
}
export function fetchActiveUsers(): AppThunkAction {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: APP_FETCH_ACTIVE_USERS,
        });

        try {
            const response = await fetchActiveUsersApi();

            dispatch(fetchActiveUsersSuccess(response.data));
        } catch(e) {
            dispatch(fetchActiveUsersFailure());
        }
    };
}
export function fetchActiveUsersSuccess(activeUsers: LoggedUsers): AppActionTypes {
    return {
        type: APP_FETCH_ACTIVE_USERS_SUCCESS,
        activeUsers,
    };
}
function fetchActiveUsersFailure(): AppActionTypes {
    return {
        type: APP_FETCH_ACTIVE_USERS_FAILURE,
    };
}
export function addUserToActiveUsers(user: UserData): AppActionTypes {
    return {
        type: APP_USER_JOINED,
        user,
    };
}
export function removeUserFromActiveUsers(userId: string): AppActionTypes {
    return {
        type: APP_USER_DISCONNECTED,
        userId,
    };
}
export function changeFilter(value: GamesFilter): AppActionTypes {
    return {
        type: APP_FILTER_CHANGE,
        gamesFilter: value,
    };
}
