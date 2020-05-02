import {Coordinates, GameTableType} from '../interfaces/game_interfaces';
import {figureTypeToMovement} from '../helpers/figures_helper';
import {ChessPieces, PlayerColors} from '../helpers/game_helper';
import {ChessFigure} from './chess_figure';
import {isFigure} from '../interfaces/type_guards';

export class GameTable {
    public table: GameTableType;

    public constructor(data: GameTableType) {
        this.table = data;
    }
    public getFigureFromCoords(x: number, y: number): ChessFigure {
        return this.table[`${x}x${y}`];
    }
    public calculatePossibleMoves(figure: ChessFigure, position: Coordinates, direction: Coordinates = null, result: Coordinates[] = []): Coordinates[] {
        const {
            color,
            type,
            hasMoved,
        } = figure;
        const isPawn = type === ChessPieces.PAWN;
        let figureMoves = figureTypeToMovement[figure.type];

        if (isPawn) {
            if (color === PlayerColors.WHITE) {
                figureMoves = {
                    ...figureMoves,
                    moves: figureMoves.moves.map((move) => ({
                        x: move.x,
                        y: move.y * (-1),
                    })),
                };
            }
            if (hasMoved && figureMoves.moves.length === 2) {
                figureMoves = {
                    ...figureMoves,
                    moves: [figureMoves.moves[0]],
                }
            }
        }

        if (figureMoves.continous && direction) {
            const nextPosition = {
                x: position.x + direction.x,
                y: position.y + direction.y,
            };

            if (this.isPositionInBoard(nextPosition)) {
                const positionFigure = this.getFigureFromCoords(nextPosition.x, nextPosition.y);

                if ((positionFigure && positionFigure.color !== color)) {
                    result.push(nextPosition);
                }
                if (!positionFigure) {
                    result.push(nextPosition);

                    this.calculatePossibleMoves(figure, nextPosition, direction, result);
                }
            }
        } else {
            figureMoves.moves.forEach((direction: Coordinates) => {
                const nextPosition = {
                    x: position.x + direction.x,
                    y: position.y + direction.y,
                };

                if (this.isPositionInBoard(nextPosition)) {
                    const positionFigure = this.getFigureFromCoords(nextPosition.x, nextPosition.y);

                    if ((positionFigure && positionFigure.color !== color) || !positionFigure) {
                        result.push(nextPosition);

                        if (figureMoves.continous) {
                            this.calculatePossibleMoves(figure, nextPosition, direction, result);
                        }
                    }
                    if (isPawn && Math.abs(direction.y) === 1) {
                        const leftNextPosition = {
                            x: nextPosition.x - 1,
                            y: nextPosition.y
                        };
                        const rightNextPosition = {
                            x: nextPosition.x + 1,
                            y: nextPosition.y,
                        };

                        if (this.isPositionInBoard(leftNextPosition)) {
                            const leftNextPositionFigure = this.getFigureFromCoords(leftNextPosition.x, leftNextPosition.y);

                            if (leftNextPositionFigure && leftNextPositionFigure.color !== color) {
                                result.push(leftNextPosition);
                            }
                        }
                        if (this.isPositionInBoard(rightNextPosition)) {
                            const rightNextPositionFigure = this.getFigureFromCoords(rightNextPosition.x, rightNextPosition.y);

                            if (rightNextPositionFigure && rightNextPositionFigure.color !== color) {
                                result.push(rightNextPosition);
                            }
                        }
                    }
                }
            });
        }

        return result;
    }
    public moveFigure(figure: ChessFigure, newPosition: Coordinates): boolean;
    public moveFigure(position: Coordinates, newPosition: Coordinates): boolean;
    public moveFigure(figure: ChessFigure | Coordinates, newPosition: Coordinates): boolean {
        let boardFigureCoords;
        let figureFromBoard;

        if (!this.isPositionInBoard(newPosition)) {
            return false;
        }

        if (isFigure(figure)) {
            boardFigureCoords = `${figure.position.x}x${figure.position.y}`;

        } else {
            boardFigureCoords = `${figure.x}x${figure.y}`;
        }

        figureFromBoard = this.table[boardFigureCoords];

        if (!figureFromBoard) {
            throw new Error('Figure not present on board at its coordinates');
        }

        delete this.table[boardFigureCoords];
        this.table[`${newPosition.x}x${newPosition.y}`] = figureFromBoard;
        figureFromBoard.move(newPosition);

        return true;
    }
    public getFiguresAbleToMove(playerColor: PlayerColors): ChessFigure[] {
        return Object.values(this.table).filter((figure: ChessFigure) => {
            return figure.color === playerColor && this.calculatePossibleMoves(figure, figure.position).length > 0;
        });
    }
    private isPositionInBoard(position: Coordinates): boolean {
        const {
            x,
            y,
        } = position;

        return x >= 0 && y >= 0 && x < 8 && y < 8;
    }
}