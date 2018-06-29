import React from 'react';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import nbLocale from 'react-intl/locale-data/nb';

import messageBundle from './texts-built/bundle'
import messages from './texts-built/frontpage'

addLocaleData(nbLocale);

const App = () => (
    <IntlProvider locale="nb" messages={messageBundle}>
        <div>
            <h1><FormattedMessage id={messages.frontpageExampleTitle}/></h1>
            <p><FormattedMessage id={messages.frontpageExampleText}/></p>
        </div>
    </IntlProvider>
);