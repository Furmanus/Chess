import {ChessPieces, PlayerColors} from '../helpers/game_helper';
import {Coordinates} from '../interfaces/game_interfaces';

export class ChessFigure {
    public color: PlayerColors;
    public type: ChessPieces;
    public position: Coordinates;
    public hasMoved: boolean;

    public constructor(color: PlayerColors, type: ChessPieces, position: Coordinates) {
        this.color = color;
        this.type = type;
        this.position = position;
    }
    public move(position: Coordinates): void {
        this.position = position;
        this.hasMoved = true;
    }
    public serialize(): {color: PlayerColors; type: ChessPieces} {
        return {...this};
    }
}
