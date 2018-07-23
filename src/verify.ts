import { IntlBundle } from './bundlers';
import * as Logger from 'js-logger';
import { createPairs, setDifference, setUnion } from './utils';

interface Errors {
    [locale: string]: Set<string>
}

export function verifyPair([el1, el2]) {
    const missing = setDifference(el1.keys, el2.keys);
    return { locale: el2.locale, missing };
}

export function hasErrors(errors: Errors): boolean {
    return Object.values(errors).some((set: Set<string>) => set.size > 0);
}

export function findErrors(bundle: IntlBundle): Errors {
    const localeKeys = Object.entries(bundle)
        .map(([locale, texts]) => ({ locale, keys: new Set(Object.keys(texts)) }));

    Logger.info(`[VERIFY] Found a total of ${localeKeys.length} locales.`);

    return createPairs(localeKeys)
        .map((pair) => [pair, [...pair].reverse()])
        .reduce((acc, list) => acc.concat(list))
        .map(verifyPair)
        .reduce((acc, { locale, missing }) => {
            const group = acc[locale] || new Set();
            acc[locale] = setUnion(group, missing);
            return acc;
        }, {});
}

export function verify(bundle: IntlBundle): number {
    const errors = findErrors(bundle);

    if (hasErrors(errors)) {
        Object.entries(errors)
            .forEach(([ locale, missingKeys ]: [string, Set<string>]) => {
                const keys = Array.from(missingKeys).map((el) => `\t${el}`).join('\n');
                Logger.error(`Keys missing in '${locale}':\n${keys}\n`)
            });
        Logger.error(`Mismatch between locales. This ain't gonna fly in production...\n\n`);
        return 1;
    }
    return 0;
}
