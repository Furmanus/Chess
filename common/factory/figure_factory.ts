import {ChessPieces, PlayerColors} from '../helpers/game_helper';
import {Coordinates} from '../interfaces/game_interfaces';
import {ChessFigure} from '../models/chess_figure';

export class FigureFactory {
    public static getWhiteFigure(type: ChessPieces, position: Coordinates): ChessFigure {
        return FigureFactory.getFigure(type, PlayerColors.WHITE, position);
    }
    public static getBlackFigure(type: ChessPieces, position: Coordinates): ChessFigure {
        return FigureFactory.getFigure(type, PlayerColors.BLACK, position);
    }
    public static getFigure(type: ChessPieces, color: PlayerColors, position: Coordinates): ChessFigure {
        return new ChessFigure(color, type, position);
    }
}
