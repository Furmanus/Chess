import {GameMove, GameTableType} from '../../common/interfaces/game_interfaces';

export interface MovementMadeGameUpdateData {
    newActiveUser: number;
    gameTable: GameTableType;
    move: GameMove;
}
