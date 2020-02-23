export enum DatabaseFieldsLengths {
    LOGIN_LENGTH = 32,
    PASSWORD_LENGTH = 64,
}
export enum SequelizeErrors {
    DUPLICATE_ENTRY = 'SequelizeUniqueConstraintError',
}
export enum GameTableFields {
    ID ='id',
    PLAYER1_ID = 'player1_id',
    PLAYER2_ID = 'player2_id',
    ACTIVE_PLAYER = 'active_player',
    GAME_DATA = 'game_data',
    MOVES= 'moves',
    GAME_STATE = 'game_state',
    VICTORIOUS_PLAYER_ID = 'victorious_player_id',
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
}
export enum UserTableFields {
    ID = 'id',
    LOGIN = 'login',
    PASSWORD = 'password',
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
}