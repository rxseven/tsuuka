import React from 'react';
// import { fireEvent, waitForElement } from 'react-testing-library';

import { factory } from 'tests/utilities';
import Combobox, { filterList, getSuggestions } from '../index';

// Arrange
const source = {
  data: [
    { code: 'EUR', name: 'Euro' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'USD', name: 'United States Dollar' }
  ],
  display: suggestion => suggestion.name,
  dropdown: ({ data, query }) => (
    <div data-testid="dropdown">
      {data.name} ({data.code})
    </div>
  ),
  id: 'combobox-001',
  input: React.forwardRef(({ onClear, value, ...inputProps }, ref) => (
    <input
      {...inputProps}
      className="form-control"
      ref={ref}
      placeholder="Enter currency"
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

  it('should render an autocomplete field', () => {
    const { queryByPlaceholderText } = setup();

    expect(queryByPlaceholderText('Enter currency')).toBeInTheDocument();
  });

  it('should render initial input value', () => {
    const props = { initialValue: 'Thai Baht' };
    const expected = { value: props.initialValue };
    const { getByPlaceholderText } = setup(props);

    expect(getByPlaceholderText('Enter currency').value).toBe(expected.value);
  });

  it('should render input value from prop when overriding', () => {
    const props = { override: true, value: 'Thai Baht' };
    const expected = { value: props.value };
    const { getByPlaceholderText } = setup(props);

    expect(getByPlaceholderText('Enter currency').value).toBe(expected.value);
  });

  describe('filterList()', () => {
    it('should return filtered list', () => {
      const list = source.data;
      const key = ['code', 'name'];
      const term = 'Thai';
      const expected = { filtered: [list[1]] };

      const result = filterList(list, key, term);

      expect(result).toEqual(expected.filtered);
    });

    it('should return empty list if not found', () => {
      const list = source.data;
      const key = ['code', 'name'];
      const term = 'Japanese Yen';
      const expected = { filtered: [] };

      const result = filterList(list, key, term);

      expect(result).toEqual(expected.filtered);
    });
  });

  describe('getSuggestions()', () => {
    it('should return suggestions', () => {
      const list = source.data;
      const value = 'Thai';
      const expected = { suggestions: [list[1]] };

      const result = getSuggestions(list, value);

      expect(result).toEqual(expected.suggestions);
    });

    it('should return empty list if not found', () => {
      const list = source.data;
      const value = 'Japanese Yen';
      const expected = { suggestions: [] };

      const result = getSuggestions(list, value);

      expect(result).toEqual(expected.suggestions);
    });

    it('should remove whitespace from both sides of the search term', () => {
      const list = source.data;
      const value = ' Thai ';
      const expected = { suggestions: [list[1]] };

      const result = getSuggestions(list, value);

      expect(result).toEqual(expected.suggestions);
    });
  });
});
