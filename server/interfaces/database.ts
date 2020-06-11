import {GameMove, GameTableType} from '../../common/interfaces/game_interfaces';
import {GameTableFields} from '../enums/database';

export interface MovementMadeGameUpdateData {
    newActiveUser: number;
    gameTable: GameTableType;
    move: GameMove;
}
export interface DataBaseGameData {
    [GameTableFields.ID]: number;
    [GameTableFields.PLAYER1_ID]: number;
    [GameTableFields.PLAYER2_ID]: number;
    [GameTableFields.ACTIVE_PLAYER]: number;
    [GameTableFields.GAME_DATA]: string;
    [GameTableFields.MOVES]: string;
    [GameTableFields.CREATED_AT]: string;
    [GameTableFields.UPDATED_AT]: string;
}
