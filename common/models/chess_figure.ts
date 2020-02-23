import {ChessPieces, PlayerColors} from '../helpers/game_helper';
import {GameTable} from '../interfaces/game_interfaces';

export class ChessFigure {
    public color: PlayerColors;
    public type: ChessPieces;
    public position: keyof GameTable;

    public constructor(color: PlayerColors, type: ChessPieces, position: keyof GameTable) {
        this.color = color;
        this.type = type;
        this.position = position;
    }
    public serialize(): {color: PlayerColors; type: ChessPieces} {
        return {...this};
    }
}
