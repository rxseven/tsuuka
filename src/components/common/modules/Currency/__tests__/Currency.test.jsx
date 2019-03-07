import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Environment from 'tests/environment';
import Currency from '../index';

describe('<Currency />', () => {
  // Arrange
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
  const component = (
    <Environment>
      <Currency {...props} />
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

  describe('Snapshot tests', () => {
    it('should render correctly', () => {
      // Act
      const tree = renderer.create(component).toJSON();

      // Assert
      expect(tree).toMatchSnapshot();
    });
  });
});