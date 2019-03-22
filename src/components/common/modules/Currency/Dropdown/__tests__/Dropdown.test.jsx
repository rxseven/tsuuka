import { factory } from 'tests/utilities';
import Dropdown from '../index';

// Arrange
const source = {
  data: { code: 'USD', name: 'United States Dollar' },
  query: 'THB'
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
});
