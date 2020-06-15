import {ChessFigure} from '../models/chess_figure';
import {Coordinates} from './game_interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function isFigure(figure: any): figure is ChessFigure {
    return figure instanceof ChessFigure;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function isCoordinates(obj: any): obj is Coordinates {
    return 'x' in obj && 'y' in obj;
}
