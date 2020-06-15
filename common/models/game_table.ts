import {Coordinates, GameTableType} from '../interfaces/game_interfaces';
import {figureTypeToMovement} from '../helpers/figures_helper';
import {ChessPieces, PlayerColors} from '../helpers/game_helper';
import {ChessFigure} from './chess_figure';
import {isCoordinates, isFigure} from '../interfaces/type_guards';

export class GameTable {
    public table: GameTableType;

    public constructor(data: GameTableType) {
        const mappedTable: GameTableType = {};

        Object.keys(data).forEach((coord: string) => {
            const figure = data[coord];

            mappedTable[coord] = new ChessFigure(figure.color, figure.type, figure.position);
        });

        this.table = mappedTable;
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
    public moveFigure(figure: Coordinates, newPosition: Coordinates): boolean;
    public moveFigure(figure: ChessFigure | Coordinates, newPosition: Coordinates): boolean {
        let boardFigureCoords;

        if (!this.isPositionInBoard(newPosition) || !this.isMoveLegal(figure, newPosition)) {
            return false;
        }

        if (isFigure(figure)) {
            boardFigureCoords = `${figure.position.x}x${figure.position.y}`;

        } else {
            boardFigureCoords = `${figure.x}x${figure.y}`;
        }

        const figureFromBoard = this.table[boardFigureCoords];

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
    public isMoveLegal(from: ChessFigure, to: Coordinates): boolean;
    public isMoveLegal(from: Coordinates, to: Coordinates): boolean;
    public isMoveLegal(from: ChessFigure | Coordinates, to: Coordinates): boolean;
    public isMoveLegal(from: ChessFigure | Coordinates, to: Coordinates): boolean {
        if (isCoordinates(from)) {
            from = this.getFigureFromCoords(from.x, from.y);

            if (!from) {
                return false;
            }
        }

        const figureMoves = this.calculatePossibleMoves(from, from.position);

        return figureMoves.some((coord: Coordinates) => coord.x === to.x && coord.y === to.y);
    }
    private isPositionInBoard(position: Coordinates): boolean {
        const {
            x,
            y,
        } = position;

        return x >= 0 && y >= 0 && x < 8 && y < 8;
    }
}
