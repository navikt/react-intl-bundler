# react-intl-bundler

[![Build Status](https://travis-ci.org/navikt/react-intl-bundler.svg?branch=master)](https://travis-ci.org/navikt/react-intl-bundler)

This module reads a set of text-files and creates a [react-intl](https://github.com/yahoo/react-intl) 
message-bundle containing all the texts. The name of the file is used as message-ID, and the content
of the file will be the message. Together with the bundle there will be a message-ID-lookup, which can be imported
in the application to easely find the ID of different messages.

## Usage

First install the tool using npm. For usage localy in a project use `npm install @navikt/react-intl-bundler --save-dev`
or to install globally and used as a CLI-tool you can use `npm install -g @navikt/react-intl-bundler`

Create a folder for all the messages to be used in the application. And run 
`react-intl-bundler {input-dir} {output-dir}` to crate the message-bundle.

Provide the built message-bundle to `react-intl`:

```typescript jsx
import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import nbLocale from 'react-intl/locale-data/nb';

import messageBundle from './example/texts-built/bundle.js'

addLocaleData(nbLocale);

const App = () => (
    <IntlProvider locale="nb" messages={messageBundle}>
        <MyApplication />
    </IntlProvider>
);
```

And in a sub-component you could then use the message-id from the built files by referncing the ID in the
`FormattedMessage`-component as such:

```typescript jsx
import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './example/texts-built/frontpage'

const MyFrontpage = () => (
    <article>
        <h1><FormattedMessage id={messages.frontpageExampleTitle}/></h1>
        <p><FormattedMessage id={messages.frontpageExampleText}/></p>
    </article>
);
```

### Multiple languages

Currently multiple languages is not supported. But this is a feature we might want in the future. Currently the  build
will assume norwegian locale. 


## Development

This application is written using TypeScript, which is transpiled to ES2017 during building (and before publishing).
To get started with developing on this application clone or fork this repository. You will find the source code
under `./src` and the tests under `./test`. 

To build/transpile the application run `npm run build` - and to run the tests run `npm run test`. After building the
application you can run it with `node ./dist/index.js ./example/texts-src ./example/texts-built` which will build
all the texts for the example-application and store the built file under `./example/texts-built`.

All commits will be built by travis, and for a pull-request to be accepted it needs to have a successfull build.

To release a new version of the application to npmjs use `npm version` on the master-branch. For instance
`npm version minor` for a minor release and make sure to push both the commit and the tag created. Travis
will trigger on the release-tag and publish a new versjon to npmjs.

## Inqueries

For inquries please create a GitHub-issue. For NAV internal inqueries please contact Team PUS on slack at #pus.