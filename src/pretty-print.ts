import IO from './io';

export function writeBundle(path: string, obj: Object) {
    const json = JSON.stringify(obj, null, 4);
    const content = `const texts = ${json};\n\nexport default texts;`;
    IO.writeFile(path, content);
}
