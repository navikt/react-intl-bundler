import * as assert from 'assert';
import {filenameToMessageId} from "../src/message-id";

describe("filenameToMessageId", () => {
    it("should parse filename with file-extension", () => {
        assert.strictEqual(filenameToMessageId("testfil.txt"), "testfil");
    });

    it("should parse filenames with dash separators", () => {
        assert.strictEqual(filenameToMessageId("en-test-fil"), "enTestFil");
    });

    it("should parse filenames with underscore separators", () => {
        assert.strictEqual(filenameToMessageId("en_test_fil"), "enTestFil");
    });

    it("should parse filenames with combinations of separators", () => {
        assert.strictEqual(filenameToMessageId("en-test_fil"), "enTestFil");
    });

    it("should parse filesnames with filepaths", () => {
        assert.strictEqual(filenameToMessageId("en/undermappe/test-fil"), "testFil");
    });
});
