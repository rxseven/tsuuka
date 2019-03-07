import { shallow } from 'enzyme';
import React from 'react';

import Environment from 'tests/environment';
import Control from '../index';

describe('<Currency.Control />', () => {
  // Arrange
  const props = {
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
  const component = (
    <Environment>
      <Control {...props} />
    </Environment>
  );

  describe('Unit tests', () => {
    it('should render without crashing', () => {
      // Act
      const wrapper = shallow(component);

      // Assert
      expect(wrapper).toBeDefined();
    });
  });
});
