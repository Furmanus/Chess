import {Figure, GameTable} from '../interfaces/game_interfaces';
import {FigureFactory} from '../factory/figure_factory';

export enum ChessPieces {
    PAWN = 'pawn',
    KNIGHT = 'knight',
    BISHOP = 'bishop',
    ROOK = 'rook',
    QUEEN = 'queen',
    KING = 'king',
}
export enum PlayerColors {
    BLACK = 'black',
    WHITE = 'white',
}
export function createInitialBoard(): GameTable {
    const table: GameTable = {};

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (j === 0) {
                table[`${i}x${j}`] = getFigureInRow(i, PlayerColors.BLACK);
            } else if (j === 1) {
                table[`${i}x${j}`] = FigureFactory.getBlackFigure(ChessPieces.PAWN);
            } else if (j === 6) {
                table[`${i}x${j}`] = FigureFactory.getWhiteFigure(ChessPieces.PAWN);
            } else if (j === 7) {
                table[`${i}x${j}`] = getFigureInRow(i, PlayerColors.WHITE);
            }
        }
    }

    return table;
}
function getFigureInRow(x: number, color: PlayerColors): Figure {
    if (x < 0 || x > 7) {
        throw new RangeError('Invalid x coordinate, must be between 0 and 7');
    }

    if (x === 0 || x === 7) {
        return FigureFactory.getFigure(ChessPieces.ROOK, color);
    } else if (x === 1 || x === 6) {
        return FigureFactory.getFigure(ChessPieces.KNIGHT, color);
    } else if (x === 2 || x === 5) {
        return FigureFactory.getFigure(ChessPieces.BISHOP, color);
    } else if (x === 3) {
        return FigureFactory.getFigure(ChessPieces.QUEEN, color);
    } else {
        return FigureFactory.getFigure(ChessPieces.KING, color);
    }
}