export function indent(level: number): string {
    let indentSpaces = "";
    for (let x=0; x<level; x++) {
        indentSpaces += "    ";
    }
    return indentSpaces;
}

function createKeyName(key: string): string {
    const re = /^[a-zA-Z][a-zA-Z0-9]+$/;
    if (re.test(key)) {
        return key;
    }
    return `'${key}'`;
}

export function prettyPrint(obj: Object, level = 0): string {
    const keys = Object.keys(obj)
        .map(key => {
            const escapedKey = createKeyName(key);
            if (typeof obj[key] == "string") {
                return `${indent(level+1)}${escapedKey}: "${obj[key]}"`;
            }
            return `${indent(level+1)}${escapedKey}: ${prettyPrint(obj[key], level+1)}`;
        })
        .join(",\n");

    return `{\n${keys}\n${indent(level)}}`
}

export function prettyPrintObject(obj: Object, name: string): string {
    return `const ${name} = ${prettyPrint(obj)};\n`;
}

export function prettyMessageBundle(obj: Object): string {
    const name = "texts";
    const objectLines = prettyPrintObject(obj, name);
    const exportLine = `\nexport default ${name};\n`;
    return objectLines + exportLine;
}
