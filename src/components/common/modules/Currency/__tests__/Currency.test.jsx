import React from 'react';

import { factory } from 'tests/utilities';
import Currency from '../index';

// Arrange
const source = {
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
  onAmount: jest.fn(),
  onExchange: jest.fn(),
  onReset: jest.fn(),
  onSelect: jest.fn(),
  override: false,
  rate: '0.87892',
  targetAmount: '87.892',
  targetCurrency: { code: 'EUR', name: 'Euro' },
  targetInputRef: React.createRef(),
  timestamp: 1551581826
};

// Setup
function setup(props) {
  return factory(Currency, source, props);
}

// Test suites
describe('<Currency />', () => {
  it('should render without crashing', () => {
    setup();
  });
});
