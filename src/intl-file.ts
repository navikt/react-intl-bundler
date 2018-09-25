import * as path from 'path';
import IO from './io';

const languagePattern = /_([^\W_]+)\.\w+$/;

function findLanguage(path) {
    const match = languagePattern.exec(path);
    if (match) {
        return match[1]
    }
    return 'nb';
}

const removeLanguagePattern = /(?:_[^\W_]+)?\.\w+$/;

function findKey(path) {
    return path.replace(removeLanguagePattern, '');
}

class IntlFile {
    private path: string;
    private language: string;
    private key: string;
    private content: string;

    static of(path: string, content?: string) {
        if (content) {
            return new IntlFile(path, content);
        }
        return new IntlFile(path, IO.getFileContent(path));
    }

    private constructor(path: string, content: string) {
        this.path = path;
        this.language = findLanguage(this.path);
        this.key = findKey(this.getFilename());
        this.content = content;
    }

    public getPath() {
        return this.path;
    }

    public getFolder() {
        return path.dirname(this.path);
    }

    public getFilename() {
        return path.basename(this.path);
    }

    public getLanguage() {
        return this.language;
    }

    public getKey() {
        return this.key;
    }

    public getContent() {
        return this.content;
    }
}

export default IntlFile;
