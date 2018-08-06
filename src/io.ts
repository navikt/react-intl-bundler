import * as fs from 'fs-extra';
import * as path from 'path';
import * as Logger from 'js-logger';
import IntlFile from './intl-file';

const filePattern = /\.(?:txt|html|md)$/;

export class IO {
    static getAllFilepaths(directory: string): IntlFile[] {
        return fs.readdirSync(directory)
            .map(file => {
                const fullPath = path.join(directory, file);
                const isDirectory = fs.lstatSync(fullPath).isDirectory();
                if (isDirectory) {
                    return IO.getAllFilepaths(fullPath);
                }
                Logger.info(`getAllFilepaths.js: Found file: ${fullPath}`);
                return [IntlFile.of(fullPath)];
            })
            .reduce((acc, cur) => acc.concat(cur), [])
            .filter((file) => filePattern.test(file.getPath()));
    }

    static getFileContent(file: string): string {
        return fs.readFileSync(file, "utf-8").trim();
    }

    static writeFile(filePath: string, content: string) {
        fs.outputFileSync(filePath, content);
    }
}

export default IO;
