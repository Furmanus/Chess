export const enum Languages {
    EN = 'en',
}
const englishTranslations = {
    navigation: {
        games: 'games',
        settings: 'settings',
        users: 'users',
        logout: 'logout',
    },
    games: {
        create: 'create',
        emptyState: 'No games found',
        gameBox: {
            onlyFirstPlayer: '{{player1}} is waiting for opponent',
            button: {
                vacantGame: 'join',
                userGame: 'enter',
            },
            turnReady: 'turn ready',
        },
        filters: {
            all: 'All',
            user: 'My games',
            vacant: 'Vacant',
        },
        notification: {
            playerJoin: {
                title: 'Info',
                message: 'Player {{playerName}} joined your game!'
            },
            gameCreated: {
                title: 'Info',
                message: 'Game successfully created!',
            },
        },
    }
};
export const appPageTranslations = {
    [Languages.EN]: englishTranslations,
};