import * as assert from 'assert';
import {filenameToMessageId, pathToLookupName} from "../src/message-id";

describe("pathToLookupName", () => {
    it("should parse filename with file-extension", () => {
        assert.strictEqual(pathToLookupName("testfil.txt"), "testfil");
    });

    it("should parse filenames with dash separators", () => {
        assert.strictEqual(pathToLookupName("en-test-fil"), "enTestFil");
    });

    it("should parse filenames with underscore separators", () => {
        assert.strictEqual(pathToLookupName("en_test_fil"), "enTestFil");
    });

    it("should parse filenames with combinations of separators", () => {
        assert.strictEqual(pathToLookupName("en-test_fil"), "enTestFil");
    });

    it("should parse filesnames with filepaths", () => {
        assert.strictEqual(pathToLookupName("en/undermappe/test-fil"), "testFil");
    });
});

describe("filenameToMessageId", () => {
    it("should remove extension from filename", () => {
        assert.strictEqual(filenameToMessageId("test-fil.txt"), "test-fil");
    });

    it("should parse filesnames in directories", () => {
        assert.strictEqual(filenameToMessageId("en/undermappe/test-fil.txt"), "test-fil");
    });
});
