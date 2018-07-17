#!/usr/bin/env node
import { ArgumentParser } from 'argparse';
import * as Logger from 'js-logger';
import * as path from 'path';
import IO from './io';
import IntlFile from './intl-file';
import { writeBundle } from './pretty-print';
import { findOutputFilename } from './utils';
import { createIdLookupBundles, createMessageBundle, IntlBundle } from './bundlers';
import { verify } from './verify';

function createParser(): ArgumentParser {
    const parser = new ArgumentParser({
        addHelp: true,
        description: 'Reads a set of text-files and creates a text-bundle for react-intl. The output is a bundle to be used with the intl-provider and a ID-lookup to be used in the application.'
    });

    parser.addArgument('input-dir', {
        help: 'Relative url to the directory where the text-files are stored.'
    });

    parser.addArgument('output-dir', {
        help: 'Relative url to the directory where the bundle should be created.'
    });

    parser.addArgument('--typescript', {
        help: 'Output the file as TypeScript',
        required: false,
        defaultValue: false,
        action: 'storeTrue'
    });

    parser.addArgument(['-v', '--verbose'], {
        help: 'Enable verbose logging',
        required: false,
        defaultValue: false,
        action: 'storeTrue'
    });

    parser.addArgument('--no-verify', {
        help: 'Skip bundle verification',
        required: false,
        defaultValue: false,
        action: 'storeTrue'
    });

    return parser;
}

const args = createParser().parseArgs();
Logger.useDefaults();
Logger.setLevel(args['verbose'] ? Logger.INFO : Logger.ERROR);

const files: IntlFile[] = IO.getAllFilepaths(args['input-dir']);
Logger.info(`Found ${files.length} intl-files`);
const bundle: IntlBundle = createMessageBundle(files);

if (!args.no_verify) {
    const exitCode = verify(bundle);
    exitCode && process.exit(exitCode);
}

const fileExtension = args['typescript'] ? 'ts' : 'js';
const messageBundleFilename = path.join(args['output-dir'], `bundle.${fileExtension}`);
writeBundle(messageBundleFilename, bundle);

const idLookupBundles = createIdLookupBundles(files);
Object.keys(idLookupBundles)
    .forEach((currentPath) => {
        let filename = findOutputFilename(args['input-dir'], args['output-dir'], currentPath, `intl.${fileExtension}`);
        writeBundle(filename, idLookupBundles[currentPath]);
    });
