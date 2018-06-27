export function indent(level: number): string {
    let indentSpaces = "";
    for (let x=0; x<level; x++) {
        indentSpaces += "    ";
    }
    return indentSpaces;
}

export function prettyPrint(obj: Object, level = 0): string {
    const keys = Object.keys(obj)
        .map(key => {
            if (typeof obj[key] == "string") {
                return `${indent(level+1)}${key}: "${obj[key]}"`;
            }
            return `${indent(level+1)}${key}: ${prettyPrint(obj[key], level+1)}`;
        })
        .join(",\n");

    return `{\n${keys}\n${indent(level)}}`
}

export function prettyPringObject(obj: Object, name: string): string {
    return `const ${name} = ${prettyPrint(obj)};\n`;
}

export function prettyMessageBundle(obj: Object): string {
    const name = "texts";
    const objectLines = prettyPringObject(obj, name);
    const exportLine = `\nexport default ${name};\n`;
    return objectLines + exportLine;
}
