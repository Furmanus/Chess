import {GameDataChangedReason} from '../contants/socket_enums';
import {GameDataWithPlayerNames} from './game_interfaces';

export interface SocketGameDataChangedData {
    gameId: number;
    reason: GameDataChangedReason;
    gameData: GameDataWithPlayerNames;
}