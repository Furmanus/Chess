import {GameDataChangedReason} from '../contants/socket_enums';
import {GameDataWithPlayerNames, GameMove} from './game_interfaces';

export interface SocketGameDataChangedData {
    gameId: number;
    reason: GameDataChangedReason;
    gameData: GameDataWithPlayerNames;
    move: GameMove;
}