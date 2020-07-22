import {isCoordinates} from '../../../common/interfaces/type_guards';
import {Coordinates} from '../../../common/interfaces/game_interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function translate(text: string, variables: any): string {
    let translatedText = text;

    Object.keys(variables).forEach((key: string) => {
        translatedText = translatedText.replace(`{{${key}}}`, variables[key]);
    });

    return translatedText;
}
export function converNumberToAlphabetLetter(val: number): string {
    if (val > 26) {
        throw new Error('Invalid value to convert');
    }

    return (val + 9).toString(36);
}
export function getDistance(x: number, y: number, x2: number, y2: number): number;
export function getDistance(x: Coordinates, y: Coordinates): number;
export function getDistance(
    x: number | Coordinates,
    y: number | Coordinates,
    x2?: number,
    y2?: number,
): number {
    if (isCoordinates(x) && isCoordinates(y)) {
        return Math.sqrt(Math.pow(x.x - y.x, 2) + Math.pow(y.y - x.y, 2));
    } else if (typeof x === 'number' && typeof y === 'number') {
        return Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
    }
    return NaN;
}
