import {ChessFigure} from '../models/chess_figure';
import {Coordinates} from './game_interfaces';

export function isFigure(figure: any): figure is ChessFigure {
    return figure instanceof ChessFigure;
}
export function isCoordinates(obj: any): obj is Coordinates {
    return 'x' in obj && 'y' in obj;
}
