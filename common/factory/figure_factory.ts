import {ChessPieces, PlayerColors} from '../helpers/game_helper';
import {Figure} from '../interfaces/game_interfaces';

export class FigureFactory {
    public static getWhiteFigure(type: ChessPieces): Figure {
        return FigureFactory.getFigure(type, PlayerColors.WHITE);
    }
    public static getBlackFigure(type: ChessPieces): Figure {
        return FigureFactory.getFigure(type, PlayerColors.BLACK);
    }
    public static getFigure(type: ChessPieces, color: PlayerColors): Figure {
        switch (type) {
            case ChessPieces.PAWN:
                return {type: ChessPieces.PAWN, color};
            case ChessPieces.KNIGHT:
                return {type: ChessPieces.KNIGHT, color};
            case ChessPieces.BISHOP:
                return {type: ChessPieces.BISHOP, color};
            case ChessPieces.ROOK:
                return {type: ChessPieces.ROOK, color};
            case ChessPieces.KING:
                return {type: ChessPieces.KING, color};
            case ChessPieces.QUEEN:
                return {type: ChessPieces.QUEEN, color};
        }
    }
}
