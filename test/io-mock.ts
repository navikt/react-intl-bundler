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

    getFilesInFolder(folder: string): string[] {
        return [];
    }

    getSubfoldersInFolder(folder: string): string[] {
        return [];
    }
}

export default IOMock;
