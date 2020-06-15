import {AppActionTypes} from '../actions/app_action_types';
import {
    APP_CREATE_GAME,
    APP_CREATE_GAME_FAILURE,
    APP_CREATE_GAME_SUCCESS,
    APP_FETCH_ACTIVE_USERS,
    APP_FETCH_ACTIVE_USERS_FAILURE,
    APP_FETCH_ACTIVE_USERS_SUCCESS,
    APP_FETCH_GAME_DATA,
    APP_FETCH_GAME_DATA_FAILURE,
    APP_FETCH_GAME_DATA_SUCCESS,
    APP_FETCH_GAMES,
    APP_FETCH_GAMES_FAILURE,
    APP_FETCH_GAMES_SUCCESS,
    APP_FETCH_USER_SETTINGS,
    APP_FETCH_USER_SETTINGS_FAILURE,
    APP_FETCH_USER_SETTINGS_SUCCESS,
    APP_FILTER_CHANGE,
    APP_GAME_DATA_CHANGED,
    APP_JOIN_USER_TO_GAME,
    APP_LEAVE_GAME,
    APP_LOGOUT,
    APP_USER_DISCONNECTED,
    APP_USER_JOINED,
} from '../constants/app_actions';
import {
    GameDataWithPlayerNames,
    GameMove,
    LoggedUsersClient,
    UserData,
} from '../../../common/interfaces/game_interfaces';
import {
    GameTableFields,
    UserTableFields,
} from '../../../server/enums/database';
import {GamesFilter} from '../constants/app_games';

export interface AppStore {
    games: GameDataWithPlayerNames[];
    activeGame: GameDataWithPlayerNames;
    isFetchingActiveGame: boolean;
    isLoadingGames: boolean;
    isCreatingGame: boolean;
    isFetchingSettings: boolean;
    isFetchingUsers: boolean;
    hasJoinToGameProcessStarted: boolean;
    gamesFilter: GamesFilter;
    userSettings: UserData;
    activeUsers: LoggedUsersClient;
    lastMove: GameMove;
}

const initialState: AppStore = {
    games: [],
    activeGame: null,
    isFetchingActiveGame: false,
    isLoadingGames: false,
    isCreatingGame: false,
    isFetchingSettings: false,
    hasJoinToGameProcessStarted: false,
    isFetchingUsers: false,
    gamesFilter: GamesFilter.User,
    userSettings: null,
    activeUsers: {},
    lastMove: null,
};

export function appReducer(state = initialState, action: AppActionTypes): AppStore {
    let gamesCopy;
    let activeUsersCopy;
    let userListJoinCopy;
    let userListRemoveCopy;
    let returnedState;

    switch (action.type) {
        case APP_LOGOUT:
        case APP_CREATE_GAME:
            return {
                ...state,
                isCreatingGame: true,
            };
        case APP_CREATE_GAME_SUCCESS:
            gamesCopy = Array.from(state.games);

            gamesCopy.push(action.createdGame);

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
            activeUsersCopy = {...state.activeUsers};

            activeUsersCopy[action.userSettings.id] = action.userSettings.login;

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
            userListJoinCopy = {
                ...state.activeUsers,
                [action.user[UserTableFields.ID]]: action.user[UserTableFields.LOGIN],
            };

            return {
                ...state,
                activeUsers: userListJoinCopy,
            };
        case APP_USER_DISCONNECTED:
            userListRemoveCopy = {...state.activeUsers};
            // TODO think how to solve it better
            delete userListRemoveCopy[action.userId as unknown as number];

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
            gamesCopy = Array.from(state.games);
            returnedState = {
                ...state,
            };

            gamesCopy.forEach((game, index) => {
                if (game[GameTableFields.ID] === action.updatedGame[GameTableFields.ID]) {
                    gamesCopy[index] = action.updatedGame;
                }
            });

            returnedState.games = gamesCopy;

            if (state.activeGame?.[GameTableFields.ID] === action.updatedGame[GameTableFields.ID]) {
                returnedState.activeGame = action.updatedGame;
            }
            if (action.move) {
                returnedState.lastMove = action.move;
            }

            return returnedState;
        case APP_FETCH_GAME_DATA:
            return {
                ...state,
                isFetchingActiveGame: true,
            };
        case APP_FETCH_GAME_DATA_SUCCESS:
            return {
                ...state,
                activeGame: action.gameData,
                isFetchingActiveGame: false,
            };
        case APP_FETCH_GAME_DATA_FAILURE:
            return {
                ...state,
                isFetchingActiveGame: false,
            };
        case APP_LEAVE_GAME:
            return {
                ...state,
                activeGame: null,
            };
        default:
            return {
                ...state,
            };
    }
}
