import IntlFile from './../src/intl-file';

function newIntlFile(path: string): IntlFile {
    return IntlFile.of(path, 'NO_CONTENT');
}

describe('IntlFile', () => {
    describe('language', () => {
        it('should have default language', () => {
            const intlFile = newIntlFile('file-without-language.txt');
            expect(intlFile.getLanguage()).toBe('nb');
        });

        it('should find language from filename', () => {
            const intlFile = newIntlFile('file-with-language_en.txt');
            expect(intlFile.getLanguage()).toBe('en');
        });
    });

    describe('filename and path', () => {
        it('should return filename', () => {
            const intlFile = newIntlFile('folder1/folder2/file.txt');
            expect(intlFile.getFilename()).toBe('file.txt');
        });

        it('should return path', () => {
            const intlFile = newIntlFile('folder1/folder2/file.txt');
            expect(intlFile.getFolder()).toBe('folder1/folder2');
        });
    });

    describe('key', () => {
        it('should remove language from filename', () => {
            const textFile = newIntlFile('folder1/folder2/file_en.txt');
            const htmlFile = newIntlFile('folder1/folder2/file_en.html');
            expect(textFile.getKey()).toBe('file');
            expect(htmlFile.getKey()).toBe('file');
        });

        it('should work on files without language', () => {
            const textFile = newIntlFile('folder1/folder2/file.txt');
            expect(textFile.getKey()).toBe('file');
        })
    });

});
