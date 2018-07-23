import IO from './../src/io';
import IntlFile from '../src/intl-file';
import fs from 'fs';

function unique<T>(list: T[]):T[] {
    return Array.from(new Set(list));
}

describe('io', () => {
    it('should read file', () => {
        expect(IO.getFileContent('./test/test-files/content.txt')).toBe('FILECONTENT\n');
    });

    it('should list all files in folder', () => {
        const files = IO.getAllFilepaths('./test/test-files');
        expect(files.length).toBe(3);
        expect(files[0] instanceof IntlFile).toBeTruthy();

        const path = files.map((file) => file.getPath());
        const language = files.map((file) => file.getLanguage());
        const key = files.map((file) => file.getKey());
        const content = files.map((file) => file.getContent());

        expect(unique(path).length).toBe(3);
        expect(unique(language).length).toBe(2);
        expect(unique(key).length).toBe(1);
        expect(unique(content).length).toBe(1);
    });

    it('should write to file', () => {
        const path = './test/tmp/tmp.txt';
        const content = 'TEST-CONTENT';

        IO.writeFile(path, content);
        IO.writeFile(path, content);
        expect(fs.existsSync(path)).toBeTruthy();
        expect(fs.readFileSync(path, 'utf-8')).toBe(content);

        fs.unlinkSync(path);
        fs.rmdirSync('./test/tmp');
    });
});
