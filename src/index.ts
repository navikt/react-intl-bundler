import { ArgumentParser } from 'argparse';
import * as Logger from 'js-logger';
import * as path from 'path';
import { IOImpl } from "./io";
import createMessageBundle from "./message-bundler";
import { prettyMessageBundle } from "./pretty-print";
import createIdLookupBundles from "./id-lookup-bundler";

function createParser(): ArgumentParser {
    const parser = new ArgumentParser({
        addHelp: true,
        description: "Reads a set of text-files and creates a text-bundle for react-intl. The output is a bundle to be used wit hthe intl-provider and a ID-lookup to be used in the application."
    });

    parser.addArgument("input-dir", {
        help: "Relative url to the directory where the text-files are stored."
    });

    parser.addArgument("output-dir", {
        help: "Relative url to the directory where the bundle should be created."
    });

    parser.addArgument("--typescript", {
        help: "Output the file as TypeScript",
        required: false,
        defaultValue: false,
        action: "storeTrue"
    });

    parser.addArgument(["-v", "--verbose"], {
        help: "Enable verbose logging",
        required: false,
        defaultValue: false,
        action: "storeTrue"
    });

    return parser;
}

function main() {
    const io = new IOImpl();
    const args = createParser().parseArgs();
    Logger.useDefaults();
    Logger.setLevel(args['verbose'] ? Logger.INFO : Logger.ERROR);

    const files = io.getAllFilepaths(args['input-dir']);
    const bundle = { nb: createMessageBundle(files, io) };

    const fileExtension = args["typescript"] ? "ts" : "js";
    const messageBundleFilename = path.join(args["output-dir"], `bundle.${fileExtension}`);
    io.writeFile(messageBundleFilename, prettyMessageBundle(bundle));

    const idLookup = createIdLookupBundles(args["input-dir"], io);
    Object.keys(idLookup).forEach(key => {
        const relativePath = path.relative(args["input-dir"], key);
        const folder = path.join(args["output-dir"], relativePath);
        const filename = path.join(folder, `index.${fileExtension}`);
        io.writeFile(filename, idLookup[key]);
    });
}

main();