export enum SocketEvent {
    UserConnected = 'UserConnected',
    UserDisconnected = 'UserDisconnected',
    PlayerJoinedToGame = 'PlayerJoinedToGame',
    GameDataChanged = 'GameDataChanged',
    FailedToUpdateGameData = 'FailedToUpdateGameData',
    MoveFigure = 'GameBoard:MoveFigure',
}
export enum GameDataChangedReason {
    PlayerJoined = 'player_joined',
    PlayerMoved = 'player_moved',
}
