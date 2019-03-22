import { fireEvent } from 'react-testing-library';

import { factory } from 'tests/utilities';
import Autocomplete from '../index';

// Arrange
const source = {
  onClear: jest.fn(),
  onChange: jest.fn(),
  placeholder: 'Placeholder',
  value: ''
};
const input = { ...source };

// Setup
function setup(props) {
  return factory(Autocomplete, source, props);
}

// Test suites
describe('<Currency.Autocomplete />', () => {
  it('should render without crashing', () => {
    setup();
  });

  it('should render "text" input by default', () => {
    const expected = { type: 'text' };
    const { getByPlaceholderText } = setup();

    expect(getByPlaceholderText(input.placeholder)).toHaveAttribute(
      'type',
      expected.type
    );
  });

  it('should not render the "clear" button by default', () => {
    const { getByTestId } = setup();

    expect(getByTestId('clear')).not.toBeVisible();
  });

  it('should render input tag with value when passed input value', () => {
    const props = { value: 'content' };
    const expected = { value: props.value };
    const { getByPlaceholderText } = setup(props);

    expect(getByPlaceholderText(input.placeholder)).toHaveAttribute(
      'value',
      expected.value
    );
  });

  it('should call onClear() when the clear button is clicked', () => {
    const expected = { called: 1 };
    const { getByTestId } = setup();

    fireEvent.click(getByTestId('clear'));

    expect(input.onClear).toHaveBeenCalledTimes(expected.called);
  });
});
