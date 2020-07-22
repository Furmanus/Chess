import {converNumberToAlphabetLetter, getDistance} from './utils';
import {isCoordinates} from '../../../common/interfaces/type_guards';

jest.mock('../../../common/interfaces/type_guards', () => ({
    isCoordinates: jest.fn(),
}));

describe('App game board utils', () => {
    it('Convert number to alphabet letter method should return correct result', () => {
        expect(converNumberToAlphabetLetter(2)).toBe('b');
    });
    it('Convert number to alphabet letter method should throw for incorrect input value', () => {
        expect(() => {
            converNumberToAlphabetLetter(35);
        }).toThrow();
    });
    it('Get distance should return correct value', () => {
        expect(getDistance(1, 1, 4, 1)).toBe(3);
        expect(getDistance(1, 1, 4, 5)).toBe(5);

        (isCoordinates as unknown as jest.Mock).mockImplementation(() => true);

        expect(getDistance({
            x: 1,
            y: 1,
        }, {
            x: 4,
            y: 5,
        })).toBe(5);
    });
});
