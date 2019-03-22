import React from 'react';

import { factory } from 'tests/utilities';
import Combobox from '../index';

// Arrange
const source = {
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

// Setup
function setup(props) {
  return factory(Combobox, source, props);
}

// Test suites
describe('<Combobox />', () => {
  it('should render without crashing', () => {
    setup();
  });
});
