import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Control from './index';

const title = 'Components/Common/Modules/Currency/Control';
const props = {
  baseAmount: 1,
  baseCurrency: { code: 'USD', name: 'United States Dollar' },
  baseInputRef: React.createRef(),
  currencies: [
    { code: 'EUR', name: 'Euro' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'USD', name: 'United States Dollar' }
  ],
  isProcessing: false,
  onAmount: action('onAmount'),
  onExchange: action('onExchange'),
  onReset: action('onReset'),
  onSelect: action('onSelect'),
  override: false,
  rate: '31.7916',
  targetAmount: 0.87892,
  targetCurrency: { code: 'THB', name: 'Thai Baht' },
  targetInputRef: React.createRef()
};

storiesOf(title, module)
  .add('default', () => (
    <Control {...props} rate={null} targetAmount="" targetCurrency={{}} />
  ))
  .add('empty base', () => (
    <Control
      {...props}
      baseCurrency={{}}
      override
      rate={null}
      targetAmount=""
    />
  ))
  .add('processing', () => (
    <Control {...props} baseAmount={1} isProcessing override rate={null} />
  ))
  .add('success', () => <Control {...props} override />)
  .add('amount', () => (
    <Control {...props} baseAmount="100" override targetAmount="87.892" />
  ))
  .add('invalid value', () => (
    <Control
      {...props}
      baseAmount="Invalid value"
      override
      targetAmount="Oops!"
    />
  ));
