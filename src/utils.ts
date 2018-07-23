import * as path from 'path';

interface GroupObject<T> {
    [key: string]: T[]
}

export function groupBy<T>(fn: ((T) => string) | string) {
    const forceFn = typeof fn === 'function' ? fn : (t: T) => t[fn];
    return (groupObject: GroupObject<T>, value: T) => {
        const groupKey: string = forceFn(value);
        const group: T[] = groupObject[groupKey] || [];
        group.push(value);
        groupObject[groupKey] = group;
        return groupObject;
    }
}

export function toObject(obj: GroupObject<any>, [key, value]: [string, any]) {
    obj[key] = value;
    return obj;
}

export function camelCase(str) {
    return str.replace(/[\W_]+(\w)?/g, (_, ch: string) => ch ? ch.toUpperCase() : '');
}

export function findOutputFilename(inputPath: string, outputPath: string, currentPath: string, filename: string) {
    const relativePath = path.relative(inputPath, currentPath);
    return path.join(outputPath, relativePath, filename);
}

export function createPairs<T>(list: T[]): T[][] {
    const pairs = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            pairs.push([list[i], list[j]]);
        }
    }

    return pairs;
}

export function setUnion<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a, ...b]);
}

export function setDifference<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a].filter((x) => !b.has(x)));
}
