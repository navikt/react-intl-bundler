import * as Utils from './../src/utils';

describe('utils', () => {
    const list = [
        { key: 'val1', key2: 'val2',  key3: 'val3'},
        { key: 'val1', key2: 'val5',  key3: 'val6'},
        { key: 'val1', key2: 'val8',  key3: 'val9'},
    ];
    describe('groupBy', () => {
        it('group by function', () => {
            const result = list.reduce(Utils.groupBy((el) => el.key), {});
            expect(result).toEqual({
                'val1': list
            });
        });

        it('group by string', () => {
            const result = list.reduce(Utils.groupBy('key'), {});
            expect(result).toEqual({
                'val1': list
            });
        });
    });

    describe('toObject', () => {
        it('should add key to object', () => {
            const result = Utils.toObject({}, ['key', 'value']);
            expect(result).toEqual({key: 'value'});
        });
    });

    describe('camelCase', () => {
        it('should camelcase specialcharacters', () => {
            expect(Utils.camelCase('')).toBe('');
            expect(Utils.camelCase('text')).toBe('text');
            expect(Utils.camelCase('text-and-more')).toBe('textAndMore');
            expect(Utils.camelCase('text_and_more')).toBe('textAndMore');
            expect(Utils.camelCase('text and more')).toBe('textAndMore');
            expect(Utils.camelCase('text---and---more')).toBe('textAndMore');
            expect(Utils.camelCase('text-_-and-_-more')).toBe('textAndMore');
            expect(Utils.camelCase('text.and%&/more...')).toBe('textAndMore');
        });
    });

    describe('findOutputFilename', () => {
        it('should preserve path', () => {
            expect(Utils.findOutputFilename(
                'input',
                'output',
                'input/folder/another',
                'myfile.txt'
            )).toBe('output\\folder\\another\\myfile.txt');
        });
    });
});
