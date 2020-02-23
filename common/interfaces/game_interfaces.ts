import {PlayerColors, ChessPieces} from '../helpers/game_helper';
import {GameTableFields, UserTableFields} from '../../server/enums/database';

export interface Figure {
    type: ChessPieces;
    color: PlayerColors;
}
export interface GameTable {
    [coord: string]: Figure;
}
export interface GameMove {
    from: string;
    to: string;
}
export interface GameData {
    [GameTableFields.ID]: number;
    [GameTableFields.PLAYER1_ID]: number;
    [GameTableFields.PLAYER2_ID]: number;
    [GameTableFields.ACTIVE_PLAYER]: '1' | '2';
    [GameTableFields.GAME_DATA]: GameTable;
    [GameTableFields.MOVES]: GameMove[];
    [GameTableFields.CREATED_AT]: string;
    [GameTableFields.UPDATED_AT]: string;
}
export type GameDataWithPlayerNames = GameData & {
    player1Name: string;
    player2Name?: string;
};
export interface User {
    [UserTableFields.ID]: number;
    [UserTableFields.LOGIN]: string;
    [UserTableFields.PASSWORD]: string;
    [UserTableFields.CREATED_AT]: string;
    [UserTableFields.UPDATED_AT]: string;
}

