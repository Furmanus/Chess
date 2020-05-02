import {ChessPieces} from './game_helper';

const allDirectionMoves = [
    Object.freeze({x: 1, y: 0}),
    Object.freeze({x: 1, y: 1}),
    Object.freeze({x: 0, y: 1}),
    Object.freeze({x: -1, y: 1}),
    Object.freeze({x: -1, y: 0}),
    Object.freeze({x: -1, y: -1}),
    Object.freeze({x: 0, y: -1}),
    Object.freeze({x: 1, y: -1}),
];

const pawnMoves = {
    moves: [
        Object.freeze({x: 0, y: 1}),
        Object.freeze({x: 0, y: 2}),
    ],
    continous: false,
};
const knightMoves = {
    moves: [
        Object.freeze({x: 1, y: 2}),
        Object.freeze({x: 2, y: 1}),
        Object.freeze({x: -1, y: 2}),
        Object.freeze({x: -2, y: 1}),
        Object.freeze({x: 1, y: -2}),
        Object.freeze({x: 2, y: -1}),
        Object.freeze({x: -1, y: -2}),
        Object.freeze({x: -2, y: -1}),
    ],
    continous: false,
};
const bishopMoves = {
    moves: [
        Object.freeze({x: 1, y: 1}),
        Object.freeze({x: -1, y: 1}),
        Object.freeze({x: 1, y: -1}),
        Object.freeze({x: -1, y: -1}),
    ],
    continous: true,
}
const rookMoves = {
    moves: [
        Object.freeze({x: 0, y: 1}),
        Object.freeze({x: 0, y: -1}),
        Object.freeze({x: 1, y: 0}),
        Object.freeze({x: -1, y: 0}),
    ],
    continous: true,
};
const kingMoves = {
    moves: [...allDirectionMoves],
    continous: false,
};
const queenMoves = {
    moves: [...allDirectionMoves],
    continous: true,
};

export const figureTypeToMovement = {
    [ChessPieces.PAWN]: pawnMoves,
    [ChessPieces.KNIGHT]: knightMoves,
    [ChessPieces.BISHOP]: bishopMoves,
    [ChessPieces.ROOK]: rookMoves,
    [ChessPieces.QUEEN]: queenMoves,
    [ChessPieces.KING]: kingMoves,
};
