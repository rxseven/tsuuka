import moment from 'moment';

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

  it('should render conversion rate', () => {
    const expected = {
      content: `1 ${source.baseCurrency.code} is worth ${source.rate} ${
        source.targetCurrency.code
      }.`
    };
    const { component } = setup();

    expect(component).toHaveTextContent(expected.content);
  });

  it('should render result description for multiple countries', () => {
    const props = {
      countries: [
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' }
      ]
    };
    const expected = {
      content: `You can spend it in the following ${
        props.countries.length
      } countries:`
    };
    const { component } = setup(props);

    expect(component).toHaveTextContent(expected.content);
  });

  it('should render result description for one country', () => {
    const expected = { content: 'You can spend it only in:' };
    const { component } = setup();

    expect(component).toHaveTextContent(expected.content);
  });

  it('should render last updated date and time', () => {
    const expected = {
      date: moment.unix(source.timestamp).format('HH:mm:ss'),
      time: moment.unix(source.timestamp).format('DD.MM.YYYY')
    };
    const { getByTestId } = setup();

    expect(getByTestId('latest-date')).toHaveTextContent(expected.date);
    expect(getByTestId('latest-time')).toHaveTextContent(expected.time);
  });
});
