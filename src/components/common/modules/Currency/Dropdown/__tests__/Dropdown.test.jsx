import { factory } from 'tests/utilities';
import Dropdown from '../index';

// Arrange
const source = {
  data: { code: 'USD', name: 'United States Dollar' },
  query: 'USD'
};

// Setup
function setup(props) {
  return factory(Dropdown, source, props);
}

// Test suites
describe('<Currency.Dropdown />', () => {
  it('should render without crashing', () => {
    setup();
  });

  it('should render text content (currency code and name)', () => {
    const expected = { ...source.data };
    const { component } = setup();

    expect(component).toHaveTextContent(expected.code);
    expect(component).toHaveTextContent(expected.name);
  });

  it('should render currency code with only 3 characters)', () => {
    const props = { ...source.data, code: 'USDx' };
    const expected = { code: source.data.code };
    const { component } = setup(props);

    expect(component).toHaveTextContent(expected.code);
  });
});
