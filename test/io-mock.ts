import IO from "../src/io";

class IOMock implements IO {
    getAllFilepaths(directory: string): string[] {
        return [];
    }

    getFileContent(file: string): string {
        return `content: ${file}`;
    }

    writeFile(path: string, content: string) {
        return;
    }
}

export default IOMock;
