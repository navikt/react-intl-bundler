import * as Logger from 'js-logger';
import IntlFile from './intl-file';
import { camelCase, groupBy, toObject } from './utils';

export interface IntlBundle {
    [locale: string]: {
        [textKey: string]: string
    }
}

function groupmapping<T>(groupingFn: (T) => string | string, mappingFn: (element: T) => [string, any], list: T[]) {
    const grouped = list.reduce(groupBy(groupingFn), {});
    const bundle = Object.keys(grouped)
        .map((key) => {
            const values = grouped[key]
                .map(mappingFn)
                .reduce(toObject, {});
            return [key, values];
        })
        .reduce(toObject, {});

    Logger.log('Bundle', bundle); // tslint:disable-line

    return bundle;
}

export function createIdLookupBundles(files: IntlFile[]) {
    return groupmapping(
        (file: IntlFile) => file.getFolder(),
        (intlFile) => [camelCase(intlFile.getKey()), intlFile.getKey()],
        files
    );
}

export function createMessageBundle(files: IntlFile[]): IntlBundle {
    return groupmapping(
        (file: IntlFile) => file.getLanguage(),
        (intlFile) => [intlFile.getKey(), intlFile.getContent()],
        files
    );
}
