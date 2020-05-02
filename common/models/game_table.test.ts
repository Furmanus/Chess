import {GameTable} from './game_table';
import {FigureFactory} from '../factory/figure_factory';
import {ChessPieces, PlayerColors} from '../helpers/game_helper';

/**
 R . . . . . . .
 . P . . . . . .
 . . P . K . . .
 . . B . . . . .
 . . P . . . . .
 . . . . . . . .
 . . . . . . . .
 . . . . Q . E .
 */
const boardMockedData = {
    '0x0': FigureFactory.getBlackFigure(ChessPieces.ROOK, {x: 0, y: 0}),
    '1x1': FigureFactory.getBlackFigure(ChessPieces.PAWN, {x: 1, y: 1}),
    '4x2': FigureFactory.getBlackFigure(ChessPieces.KNIGHT, {x: 4, y: 2}),
    '4x7': FigureFactory.getBlackFigure(ChessPieces.QUEEN, {x: 4, y: 7}),
    '2x2': FigureFactory.getWhiteFigure(ChessPieces.PAWN, {x: 2, y: 2}),
    '2x3': FigureFactory.getWhiteFigure(ChessPieces.BISHOP, {x: 2, y: 3}),
    '6x7': FigureFactory.getWhiteFigure(ChessPieces.KING, {x: 6, y: 7}),
    '2x4': FigureFactory.getWhiteFigure(ChessPieces.PAWN, {x: 2, y: 4}),
};
const whiteKingLegalMoves = [
    {x: 5,y: 7},
    {x: 5,y: 6},
    {x: 6,y: 6},
    {x: 7,y: 6},
    {x: 7,y: 7},
];
const blackQueenLegalMoves = [
    {x: 4,y: 6},
    {x: 4,y: 5},
    {x: 4,y: 4},
    {x: 4,y: 3},
    {x: 0,y: 7},
    {x: 1,y: 7},
    {x: 2,y: 7},
    {x: 3,y: 7},
    {x: 5,y: 7},
    {x: 6,y: 7},
    {x: 3,y: 6},
    {x: 2,y: 5},
    {x: 1,y: 4},
    {x: 0,y: 3},
    {x: 5,y: 6},
    {x: 6,y: 5},
    {x: 7,y: 4},
];
const whiteBishopLegalMoves = [
    {x: 1 ,y: 4},
    {x: 0 ,y: 5},
    {x: 3 ,y: 2},
    {x: 4 ,y: 1},
    {x: 5 ,y: 0},
    {x: 1 ,y: 2},
    {x: 0 ,y: 1},
    {x: 3 ,y: 4},
    {x: 4 ,y: 5},
    {x: 5 ,y: 6},
];
const whiteKnightLegalMoves = [
    {x: 2, y: 1},
    {x: 3, y: 0},
    {x: 5, y: 0},
    {x: 6, y: 1},
    {x: 6, y: 3},
    {x: 5, y: 4},
    {x: 2, y: 3},
    {x: 3, y: 4},
];
const rookLegalMoves = [
    {x: 0, y: 1},
    {x: 0, y: 2},
    {x: 0, y: 3},
    {x: 0, y: 4},
    {x: 0, y: 5},
    {x: 0, y: 6},
    {x: 0, y: 7},
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 5, y: 0},
    {x: 6, y: 0},
    {x: 7, y: 0},
];

describe('Game table model class', () => {
    let gameTable: GameTable;

    beforeEach(() => {
        gameTable = new GameTable({...boardMockedData});
    });

    it('should construct correctly', () => {
        expect(Object.keys(gameTable.table).length).toBe(Object.keys(boardMockedData).length);
    });
    it('should get proper figure from coordinates', () => {
        const figure = gameTable.getFigureFromCoords(0, 0);

        expect(figure).toBeDefined();
        expect(figure.type).toBe(ChessPieces.ROOK);
        expect(figure.color).toBe(PlayerColors.BLACK);
    });

    describe('calculate possible moves for figures', () => {
        it('should calculate correctly possible moves for black rook', () => {
            const rookPosition = {x: 0, y: 0};
            const rookFigure = gameTable.getFigureFromCoords(rookPosition.x, rookPosition.y);
            const rookMoves = gameTable.calculatePossibleMoves(rookFigure, rookPosition);

            expect(rookMoves).toEqual(expect.arrayContaining(rookLegalMoves));
            expect(rookLegalMoves).toEqual(expect.arrayContaining(rookMoves));
        });
        it('should calculate correctly possible moves for white knight', () => {
            const knightPosition = {x: 4, y: 2};
            const knightFigure = gameTable.getFigureFromCoords(knightPosition.x, knightPosition.y);
            const knightMoves = gameTable.calculatePossibleMoves(knightFigure, knightPosition);

            expect(knightMoves).toEqual(expect.arrayContaining(whiteKnightLegalMoves));
            expect(whiteKnightLegalMoves).toEqual(expect.arrayContaining(knightMoves));
        });
        it('should calculate correctly possible moves for white bishop', () => {
            const bishopPosition = {x: 2, y: 3};
            const bishopFigure = gameTable.getFigureFromCoords(bishopPosition.x, bishopPosition.y);
            const bishopMoves = gameTable.calculatePossibleMoves(bishopFigure, bishopPosition);

            expect(bishopMoves).toEqual(expect.arrayContaining(whiteBishopLegalMoves));
            expect(whiteBishopLegalMoves).toEqual(expect.arrayContaining(bishopMoves));
        });
        it('should calculate correctly possible moves for black queen', () => {
            const queenPosition = {x: 4, y: 7};
            const queenFigure = gameTable.getFigureFromCoords(queenPosition.x, queenPosition.y);
            const queenMoves = gameTable.calculatePossibleMoves(queenFigure, queenPosition);

            expect(queenMoves).toEqual(expect.arrayContaining(blackQueenLegalMoves));
            expect(blackQueenLegalMoves).toEqual(expect.arrayContaining(queenMoves));
        });
        it('should calculate correctly possible moves for white king', () => {
            const kingPosition = {x: 6, y: 7};
            const kingFigure = gameTable.getFigureFromCoords(kingPosition.x, kingPosition.y);
            const kingMoves = gameTable.calculatePossibleMoves(kingFigure, kingPosition);

            expect(kingMoves).toEqual(expect.arrayContaining(whiteKingLegalMoves));
            expect(whiteKingLegalMoves).toEqual(expect.arrayContaining(kingMoves));
        });
        it('should calculate correctly possible moves for white pawn', () => {
            const pawnPosition = {x: 2, y: 4};
            const pawnFigure = gameTable.getFigureFromCoords(pawnPosition.x, pawnPosition.y);
            const pawnMoves = gameTable.calculatePossibleMoves(pawnFigure, pawnPosition);

            expect(pawnMoves.length).toBe(0);
        });
        it('should calculate correctly possible moves for black pawn', () => {
            const pawnPosition = {x: 1, y: 1};
            const pawnFigure = gameTable.getFigureFromCoords(pawnPosition.x, pawnPosition.y);
            const pawnMoves = gameTable.calculatePossibleMoves(pawnFigure, pawnPosition);

            expect(pawnMoves).toEqual([{x: 1, y: 2}, {x: 2, y: 2}, {x: 1, y: 3}]);
        });
        it ('should calculate correctly possible moves for black pawn after movement', () => {
            const pawnPosition = {x: 1, y: 1};
            const pawnFigure = gameTable.getFigureFromCoords(pawnPosition.x, pawnPosition.y);
            let pawnPossibleMovesAfterMovement;

            gameTable.moveFigure(pawnPosition, {x: 1, y: 2});
            pawnPossibleMovesAfterMovement = gameTable.calculatePossibleMoves(pawnFigure, {x: 1, y: 2});

            expect(pawnPossibleMovesAfterMovement).toEqual([{x: 1, y: 3}, {x: 2, y: 3}]);
        });
    });
    describe('move figures', () => {
        it('should move figure correctly', () => {
            const kingPosition = {x: 6, y: 7};
            const kingFigure = gameTable.getFigureFromCoords(kingPosition.x, kingPosition.y);
            const newPosition = {x: 6, y: 6};

            gameTable.moveFigure(kingFigure, newPosition);

            expect(kingFigure.position).toEqual(newPosition);
            expect(gameTable.table[`${kingPosition.x}x${kingPosition.y}`]).toBeUndefined();
            expect(gameTable.getFigureFromCoords(newPosition.x, newPosition.y));
        });
    });
    describe('calculate figures with moves', () => {
        it('should properly calculate number of figures with moves for white player', () => {
            expect(gameTable.getFiguresAbleToMove(PlayerColors.WHITE).length).toBe(3);
        });
        it('should properly calculate number of figures with moves for black player', () => {
            expect(gameTable.getFiguresAbleToMove(PlayerColors.BLACK).length).toBe(4);
        });
    });
});
