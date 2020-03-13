import {AppActionTypes} from '../actions/app_action_types';
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
    APP_GAME_DATA_CHANGED,
    APP_JOIN_USER_TO_GAME,
    APP_LOGOUT,
    APP_USER_DISCONNECTED,
    APP_USER_JOINED,
} from '../constants/app_actions';
import {GameDataWithPlayerNames, LoggedUsersClient, UserData,} from '../../../common/interfaces/game_interfaces';
import {GameTableFields, UserTableFields} from '../../../server/enums/database';
import {GamesFilter} from '../constants/app_games';

export interface AppStore {
    games: GameDataWithPlayerNames[];
    isLoadingGames: boolean;
    isCreatingGame: boolean;
    isFetchingSettings: boolean;
    isFetchingUsers: boolean;
    hasJoinToGameProcessStarted: boolean;
    gamesFilter: GamesFilter;
    userSettings: UserData;
    activeUsers: LoggedUsersClient;
}

const initialState: AppStore = {
    games: [],
    isLoadingGames: false,
    isCreatingGame: false,
    isFetchingSettings: false,
    hasJoinToGameProcessStarted: false,
    isFetchingUsers: false,
    gamesFilter: GamesFilter.User,
    userSettings: null,
    activeUsers: {},
};

export function appReducer(state = initialState, action: AppActionTypes): AppStore {
    let gamesCopy;

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
            gamesCopy = Array.from(state.games);

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
            const {
                id,
                login,
            } = action.userSettings;
            const activeUsersCopy = {...state.activeUsers};

            activeUsersCopy[id] = login;

            return {
                ...state,
                isFetchingSettings: false,
                userSettings: action.userSettings,
                activeUsers: activeUsersCopy,
            };
        case APP_FETCH_USER_SETTINGS_FAILURE:
            return {
                ...state,
                isFetchingSettings: false,
            };
        case APP_FETCH_ACTIVE_USERS:
            return {
                ...state,
                isFetchingUsers: true,
            };
        case APP_FETCH_ACTIVE_USERS_SUCCESS:
            return {
                ...state,
                activeUsers: action.activeUsers,
                isFetchingUsers: false,
            };
        case APP_FETCH_ACTIVE_USERS_FAILURE:
            return {
                ...state,
                isFetchingUsers: false,
            };
        case APP_USER_JOINED:
            const userListJoinCopy = {
                ...state.activeUsers,
                [action.user[UserTableFields.ID]]: action.user[UserTableFields.LOGIN],
            };

            return {
                ...state,
                activeUsers: userListJoinCopy,
            };
        case APP_USER_DISCONNECTED:
            const userListRemoveCopy = {...state.activeUsers};
            // TODO think how to solve it better
            delete userListRemoveCopy[action.userId as any];

            return {
                ...state,
                activeUsers: userListRemoveCopy,
            };
        case APP_FILTER_CHANGE:
            return {
                ...state,
                gamesFilter: action.gamesFilter,
            };
        case APP_JOIN_USER_TO_GAME:
            return {
                ...state,
                hasJoinToGameProcessStarted: true,
            };
        case APP_GAME_DATA_CHANGED:
            const {
                updatedGame,
            } = action;
            gamesCopy = Array.from(state.games);

            gamesCopy.forEach((game, index) => {
                if (game[GameTableFields.ID] === updatedGame[GameTableFields.ID]) {
                    gamesCopy[index] = updatedGame;
                }
            });

            return {
                ...state,
                games: gamesCopy,
            };
        default:
            return {
                ...state,
            };
    }
}
