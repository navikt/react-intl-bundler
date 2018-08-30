import { findErrors, hasErrors, verify, verifyPair } from './../src/verify';
import * as Logger from 'js-logger';

describe('verify', () => {
    describe('verifyPairs', () => {
        it('should find missing keys', () => {
            const local1 = { locale: 'en', keys: new Set(['a', 'b'])};
            const local2 = { locale: 'en', keys: new Set(['a', 'c'])};
            const result = verifyPair([local1, local2]);

            expect(result.locale).toBe('en');
            expect(result.missing).toEqual(new Set(['b']));
        });

        it('should return empty set if everythis is ok', () => {
            const local1 = { locale: 'en', keys: new Set(['a', 'b'])};
            const local2 = { locale: 'en', keys: new Set(['a', 'b'])};
            const result = verifyPair([local1, local2]);

            expect(result.locale).toBe('en');
            expect(result.missing).toEqual(new Set([]));
        });
    });

    describe('hasErrors', () => {
        it('should return true if a key is missing', () => {
            const errors = {
                nb: new Set([] as string[]),
                en: new Set(['a'])
            };

            expect(hasErrors(errors)).toBe(true);
        });

        it('should return false if everything is ok', () => {
            const errors = {
                nb: new Set([] as string[]),
                en: new Set([] as string[])
            };

            expect(hasErrors(errors)).toBe(false);
        });
    });

    describe('findErrors', () => {
        it('should find missing keys', () => {
            const bundle = {
                nb: {
                    key1: 'content',
                    key2: 'content'
                },
                en: {
                    key1: 'content',
                    key3: 'content'
                }
            };

            expect(findErrors(bundle)).toEqual({
                nb: new Set(['key3']),
                en: new Set(['key2'])
            });
        });

        it('should group from multiple locales', () => {
            const bundle = {
                nb: {
                    key1: 'content',
                    key2: 'content'
                },
                en: {
                    key1: 'content',
                    key3: 'content'
                },
                fr: {
                    key2: 'content',
                    key4: 'content'
                }
            };

            expect(findErrors(bundle)).toEqual({
                nb: new Set(['key3', 'key4']),
                en: new Set(['key2', 'key4']),
                fr: new Set(['key1', 'key3'])
            });
        });

        it('should return empty sets if everything is ok', () => {
            const bundle = {
                nb: {
                    key1: 'content',
                    key2: 'content'
                },
                en: {
                    key1: 'content',
                    key2: 'content'
                },
                fr: {
                    key1: 'content',
                    key2: 'content'
                }
            };

            expect(findErrors(bundle)).toEqual({
                nb: new Set([]),
                en: new Set([]),
                fr: new Set([])
            });
        });
    });

    describe('verify', () => {

        it('should return exitcode 1 on errors', () => {
            const bundle = {
                nb: { key1: 'content' },
                en: { key2: 'content' }
            };

            expect(verify(bundle)).toBe(1);
        });

        it('should return exitcode 0 if ok', () => {
            const bundle = {
                nb: { key1: 'content' },
                en: { key1: 'content' }
            };

            expect(verify(bundle)).toBe(0);
        });

        it('should handle single translation', () => {
            const bundle = {
                nb: { key1: 'content', key2: 'content' }
            };
            expect(verify(bundle)).toBe(0);
        });
    });
});
