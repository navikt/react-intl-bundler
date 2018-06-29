import * as path from 'path';
import * as Logger from 'js-logger';
import IO from './io';
import { pathToLookupName, filenameToMessageId } from './message-id';
import { prettyPrintObject } from './pretty-print';

function createIdLookupBundles(directory: string, io: IO): { [key: string]: string } {
    const subfolders = io.getSubfoldersInFolder(directory).map(dir => path.join(directory, dir));
    const files = io.getFilesInFolder(directory);
    let idTable = {};
    idTable[directory] = createFileContent(subfolders, files);

    subfolders.forEach(dir => {
        idTable = {...idTable, ...createIdLookupBundles(dir, io)}
    });

    Logger.info("createIdLookupBundles: created id lookup for " + directory);
    return idTable;
}

function createFileContent(directories: string[], files: string[]): string {
    let filecontent = "";

    directories.forEach(dir => {
        const folderName = path.parse(dir).name;
        const folderBundleName = pathToLookupName(folderName);
        filecontent += `import { default as ${folderBundleName} } from './${folderName}';\n`
    });

    if (directories.length > 0) {
        filecontent += '\n';
    }

    if (files.length > 0) {
        const textIds = {};
        files.forEach(file => textIds[pathToLookupName(file)] = filenameToMessageId(file));
        filecontent += prettyPrintObject(textIds, "texts");
        filecontent += '\n';
    }

    filecontent += "export default {\n";

    if (directories.length > 0) {
        filecontent += directories.map(dir => "    " + pathToLookupName(path.parse(dir).name)).join(',\n') + '\n';
    }

    if (files.length > 0) {
        filecontent += "    ...texts,\n"
    }

    filecontent += "};\n";

    return filecontent;
}

export default createIdLookupBundles;
