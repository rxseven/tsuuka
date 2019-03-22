import React from 'react';

import { factory } from 'tests/utilities';
import Control from '../index';

// Arrange
const source = {
  baseAmount: 100,
  baseCurrency: { code: 'USD', name: 'United States Dollar' },
  baseInputRef: React.createRef(),
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
  rate: '31.7916',
  targetAmount: '87.892',
  targetCurrency: { code: 'THB', name: 'Thai Baht' },
  targetInputRef: React.createRef()
};

// Setup
function setup(props) {
  return factory(Control, source, props);
}

// Test suites
describe('<Currency.Control />', () => {
  it('should render without crashing', () => {
    setup();
  });
});
