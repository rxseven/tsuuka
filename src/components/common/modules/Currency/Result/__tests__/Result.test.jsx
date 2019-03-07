import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Environment from 'tests/environment';
import Result from '../index';

describe('<Currency.Result />', () => {
  // Arrange
  const props = {
    baseCurrency: { code: 'USD', name: 'United States Dollar' },
    countries: [{ code: 'TH', name: 'Thailand' }],
    rate: '31.7916',
    targetCurrency: { code: 'THB', name: 'Thai Baht' },
    timestamp: 1551581826
  };
  const component = (
    <Environment>
      <Result {...props} />
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
