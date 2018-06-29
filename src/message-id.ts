import * as Logger from 'js-logger';
import * as path from 'path';

export function filenameToMessageId(filePath: string): string {
    const filename = path.parse(filePath).name;
    const filenameNoExtension  = filename.split('.')[0];
    Logger.info(`filenameToMessageId: ${filePath} -> ${filenameNoExtension}`);
    return filenameNoExtension;
}

export function pathToLookupName(folderPath: string): string {
    const filename = path.parse(folderPath).name;
    const parts = filename.split(/[\.\-\_]/);
    let messageId = parts.shift();
    for(const part of parts) {
        const partSplitted = part.split("");
        messageId += partSplitted.shift().toUpperCase();
        messageId += partSplitted.join("")
    }
    Logger.info(`folderToLookupName: ${folderPath} -> ${messageId}`);
    return messageId;
}
