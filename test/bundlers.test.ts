import IntlFile from "./../src/intl-file";
import { createMessageBundle } from "../src/bundlers";

describe("bundlers", () => {
    it("createMessageBundle", () => {
        const files = [
            "mappe/test-fil-1_nb.txt",
            "mappe/undermappe/test-fil-2.txt",
            "mappe/enundermappe/en-lengre-key_nb.txt",
            "mappe/enundermappe/en-lengre-key_en.txt",
        ].map((file) => IntlFile.of(file, `content: ${file}`));

        const bundle = createMessageBundle(files);
        const expected = {
            "nb": {
                "test-fil-1": "content: mappe/test-fil-1_nb.txt",
                "test-fil-2": "content: mappe/undermappe/test-fil-2.txt",
                "en-lengre-key": "content: mappe/enundermappe/en-lengre-key_nb.txt"
            },
            "en": {
                "en-lengre-key": "content: mappe/enundermappe/en-lengre-key_en.txt"
            }
        };

        expect(bundle).toEqual(expected);
    });
});
