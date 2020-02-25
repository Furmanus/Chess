import {AppActionTypes} from '../actions/app_action_types';
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
} from '../constants/app_actions';
import {GameDataWithPlayerNames, UserData,} from '../../../common/interfaces/game_interfaces';

export interface AppStore {
    games: GameDataWithPlayerNames[];
    isLoadingGames: boolean;
    isCreatingGame: boolean;
    isFetchingSettings: boolean;
    userSettings: UserData;
}

const initialState: AppStore = {
    games: [],
    isLoadingGames: false,
    isCreatingGame: false,
    isFetchingSettings: false,
    userSettings: null,
};

export function appReducer(state = initialState, action: AppActionTypes): AppStore {
    switch (action.type) {
        case APP_LOGOUT:
        case APP_CREATE_GAME:
            return {
                ...state,
                isCreatingGame: true,
            };
        case APP_CREATE_GAME_SUCCESS:
            const {
                createdGame,
            } = action;
            const gamesCopy = Array.from(state.games);

            gamesCopy.push(createdGame);

            return {
                ...state,
                games: gamesCopy,
                isCreatingGame: false,
            };
        case APP_CREATE_GAME_FAILURE:
            return {
                ...state,
                isCreatingGame: false,
            };
        case APP_FETCH_GAMES:
            return {
                ...state,
                isLoadingGames: true,
            };
        case APP_FETCH_GAMES_SUCCESS:
            return {
                ...state,
                isLoadingGames: false,
                games: action.games,
            };
        case APP_FETCH_GAMES_FAILURE:
            return {
                ...state,
                isLoadingGames: false,
            };
        case APP_FETCH_USER_SETTINGS:
            return {
                ...state,
                isFetchingSettings: true,
            };
        case APP_FETCH_USER_SETTINGS_SUCCESS:
            return {
                ...state,
                isFetchingSettings: false,
                userSettings: action.userSettings,
            };
        case APP_FETCH_USER_SETTINGS_FAILURE:
            return {
                ...state,
                isFetchingSettings: false,
            };
        default:
            return {
                ...state,
            };
    }
}
