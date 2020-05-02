import {ChessFigure} from '../models/chess_figure';

export function isFigure(figure: any): figure is ChessFigure {
    return figure instanceof ChessFigure;
}
