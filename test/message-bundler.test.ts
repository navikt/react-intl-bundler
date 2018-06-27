import * as assert from 'assert';
import createMessageBundle from "../src/message-bundler";
import IOMock from "./io-mock";

const io = new IOMock();

describe("createMessageBundle", () => {
    it("should create a bundle for given files ", () => {
        const files = [
            "mappe/test-fil-1.txt",
            "mappe/undermappe/test-fil-2.txt",
            "mappe/enundermappe/en-lengre-key.txt",
        ];

        const bundle = createMessageBundle(files, io);
        const expected = {
            "testFil1": "content: mappe/test-fil-1.txt",
            "testFil2": "content: mappe/undermappe/test-fil-2.txt",
            "enLengreKey": "content: mappe/enundermappe/en-lengre-key.txt"
        };

        assert.deepStrictEqual(bundle, expected);
    });
});
