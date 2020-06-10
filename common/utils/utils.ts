import {Coordinates} from '../interfaces/game_interfaces';

export function getCoordinatesFromString(coords: string): Coordinates {
    const pos = coords.split('x');

    return {
        x: parseInt(pos[0], 10),
        y: parseInt(pos[1], 10),
    };
}
