import { filenameToMessageId } from "./message-id";
import IO from "./io";

function createMessageBundle(files: string[], io: IO): Object {
    let bundle = {};
    files.forEach(file => {
        bundle[filenameToMessageId(file)] = io.getFileContent(file);
    });
    return bundle;
}

export default createMessageBundle;