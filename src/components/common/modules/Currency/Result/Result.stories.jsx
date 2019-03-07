import React from 'react';
import { storiesOf } from '@storybook/react';

import Result from './index';

const title = 'Components/Common/Modules/Currency/Result';
const props = {
  baseCurrency: { code: 'USD', name: 'United States Dollar' },
  countries: [{ code: 'TH', name: 'Thailand' }],
  rate: '31.7916',
  targetCurrency: { code: 'THB', name: 'Thai Baht' },
  timestamp: 1551581826
};

storiesOf(title, module)
  .add('one item', () => <Result {...props} />)
  .add('multiple items', () => (
    <Result
      {...props}
      countries={[
        { code: 'DE', name: 'Germany' },
        { code: 'ES', name: 'Spain' },
        { code: 'IT', name: 'Italy' }
      ]}
      rate="0.87892"
      targetCurrency={{ code: 'EUR', name: 'Euro' }}
    />
  ));
