import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Combobox from '../index';

describe('<Combobox />', () => {
  // Arrange
  const props = {
    data: [
      { code: 'EUR', name: 'Euro' },
      { code: 'THB', name: 'Thai Baht' },
      { code: 'USD', name: 'United States Dollar' }
    ],
    display: suggestion => suggestion.name,
    dropdown: ({ data, query }) => (
      <div>
        {data.name} ({data.code})
      </div>
    ),
    id: 'combobox-001',
    input: React.forwardRef(({ onClear, value, ...inputProps }, ref) => (
      <input
        {...inputProps}
        className="form-control"
        ref={ref}
        type="text"
        value={value}
      />
    )),
    onReset: jest.fn(),
    onSelect: jest.fn(),
    placeholder: 'Combobox'
  };
  const component = <Combobox {...props} />;

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
