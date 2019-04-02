import React from 'react';

import { factory } from 'tests/utilities';
import { Currency } from '../index';

// Arrange
const source = {
  baseInputRef: React.createRef(),
  context: {
    state: {
      currencies: []
    }
  },
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
  targetInputRef: React.createRef()
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
