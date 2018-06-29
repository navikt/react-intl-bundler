import * as fs from 'fs';
import * as path from 'path';
import * as Logger from 'js-logger';

interface IO {
    getAllFilepaths(directory: string): string[];
    getFileContent(file: string): string;
    writeFile(path: string, content: string);
    getFilesInFolder(folder: string): string[];
    getSubfoldersInFolder(folder: string): string[];
}

export class IOImpl implements IO {
    getAllFilepaths(directory: string): string[] {
        return fs.readdirSync(directory)
            .map(file => {
                const fullPath = path.join(directory, file);
                const isDirectory = fs.lstatSync(fullPath).isDirectory();
                if (isDirectory) {
                    return this.getAllFilepaths(fullPath);
                }
                Logger.info(`getAllFilepaths.js: Found file: ${fullPath}`);
                return [fullPath]
            })
            .reduce((acc, cur) => acc.concat(cur), [])
    }

    getFilesInFolder(directory: string): string[] {
        return fs.readdirSync(directory)
            .filter(file => fs.lstatSync(path.join(directory, file)).isFile())
    }

    getSubfoldersInFolder(directory: string): string[] {
        return fs.readdirSync(directory)
            .filter(file => fs.lstatSync(path.join(directory, file)).isDirectory())
    }

    getFileContent(file: string): string {
        return fs.readFileSync(file, "utf-8");
    }

    writeFile(filePath: string, content: string) {
        if (!fs.existsSync(path.parse(filePath).dir)) {
            fs.mkdirSync(path.parse(filePath).dir);
        }
        fs.writeFileSync(filePath, content, { encoding: "utf8" })
    }
}

export default IO;
