# nav-react-intl-bundler (WIP)

[![CircleCI](https://circleci.com/gh/navikt/react-intl-bundler.svg?style=svg)](https://circleci.com/gh/navikt/react-intl-bundler)

This module reads a set of text-files and creates a [react-intl](https://github.com/yahoo/react-intl) 
message-bundle containing all the texts. The name of the file is used as message-ID, and the content
of the file will be the message. Together with the bundle there will be a message-ID-lookup, which can be imported
in the application to easely find the ID of different messages.

## Usage

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

Currently multiple languages is not supported. But this is a feature we might want in the future. Currently the
standard build will assume norwegian locale, but this can be overriden using a command-line argument when building
the bundle, to set your locale...

## Development

Hvordan komme i gang med utvikling

## Inqueries

For inquries please create a GitHub-issue. For NAV internal inqueries please contact Team PUS on slack at #pus.