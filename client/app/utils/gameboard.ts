import {ChessFigure} from '../../../common/models/chess_figure';

export function mapFiguresToCoords(figures: ChessFigure[]): string[] {
    return figures.map((figure) => `${figure.position.x}x${figure.position.y}`);
}