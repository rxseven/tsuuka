import { factory } from 'tests/utilities';
import Result from '../index';

// Arrange
const source = {
  baseCurrency: { code: 'USD', name: 'United States Dollar' },
  countries: [{ code: 'TH', name: 'Thailand' }],
  rate: '31.7916',
  targetCurrency: { code: 'THB', name: 'Thai Baht' },
  timestamp: 1551581826
};

// Setup
function setup(props) {
  return factory(Result, source, props);
}

// Test suites
describe('<Currency.Result />', () => {
  it('should render without crashing', () => {
    setup();
  });
});
