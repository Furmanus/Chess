export const enum Languages {
    EN = 'en',
}
const englishTranslations = {
    navigation: {
        games: 'games',
        settings: 'settings',
        logout: 'logout',
    },
    games: {
        create: 'create',
        emptyState: 'You have no active games.',
        gameBox: {
            onlyFirstPlayer: '{{player1}} is waiting for opponent',
            button: 'enter',
        },
    }
};
export const appPageTranslations = {
    [Languages.EN]: englishTranslations,
};