import { factory } from 'tests/utilities';
import Country from '../index';

// Arrange
const source = {
  data: [
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'TH', name: 'Thailand' }
  ]
};

// Setup
function setup(props) {
  return factory(Country, source, props);
}

// Test suites
describe('<Country />', () => {
  it('should render without crashing', () => {
    setup();
  });
});
