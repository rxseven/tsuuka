import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import View from './index';

const title = 'Components/Common/Modules/Currency/View';
const props = {
  baseAmount: 100,
  baseCurrency: { code: 'USD', name: 'United States Dollar' },
  baseInputRef: React.createRef(),
  countries: [
    { code: 'DE', name: 'Germany' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' }
  ],
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
  rate: '0.87892',
  targetAmount: '87.892',
  targetCurrency: { code: 'EUR', name: 'Euro' },
  targetInputRef: React.createRef(),
  timestamp: 1551581826
};

storiesOf(title, module).add('default', () => <View {...props} override />);

export default { title };
