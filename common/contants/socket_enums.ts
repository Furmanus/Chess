export enum SocketEvent {
    UserConnected = 'UserConnected',
    UserDisconnected = 'UserDisconnected',
    PlayerJoinedToGame = 'PlayerJoinedToGame',
    GameDataChanged = 'GameDataChanged',
    FailedToUpdateGameData = 'FailedToUpdateGameData',
}
export enum GameDataChangedReason {
    PlayerJoined = 'player_joined',
}
