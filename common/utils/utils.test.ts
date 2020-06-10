import {getCoordinatesFromString} from './utils';

describe('utils', () => {
    it('Should return correct coordinates from convert method', () => {
        const string = '2x1';

        expect(getCoordinatesFromString(string)).toEqual({x: 2, y: 1});
    });
});