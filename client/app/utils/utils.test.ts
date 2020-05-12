import {converNumberToAlphabetLetter} from './utils';

describe('App game board utils', () => {
    it('Convert number to alphabet letter method should return correct result', () => {
        expect(converNumberToAlphabetLetter(2)).toBe('b');
    });
    it('Convert number to alphabet letter method should throw for incorrect input value', () => {
        expect(() => {
            converNumberToAlphabetLetter(35);
        }).toThrow();
    });
});