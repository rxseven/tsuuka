import React from 'react';

import Alert from 'components/common/base/Alert';
import Spinner from 'components/common/base/Spinner';
import { factory } from 'tests/utilities';
import View from '../index';

// Mock
jest.mock('components/common/base/Alert', () => jest.fn(() => <i />));
jest.mock('components/common/base/Spinner', () => jest.fn(() => <i />));

// Arrange
const source = {
  baseAmount: 100,
  baseCurrency: { code: 'USD', name: 'United States Dollar' },
  baseInputRef: React.createRef(),
  // countries: [
  //   { code: 'DE', name: 'Germany' },
  //   { code: 'IT', name: 'Italy' },
  //   { code: 'ES', name: 'Spain' }
  // ],
  countries: [],
  currencies: [],
  isLoading: false,
  isProcessing: false,
  onAmount: jest.fn(),
  onExchange: jest.fn(),
  onReset: jest.fn(),
  onSelect: jest.fn(),
  override: false,
  rate: null,
  targetAmount: '87.892',
  targetCurrency: { code: 'EUR', name: 'Euro' },
  targetInputRef: React.createRef(),
  timestamp: 1551581826
};

// Setup
function setup(props) {
  return factory(View, source, props);
}

// Cleanup
afterEach(() => {
  Alert.mockClear();
});

// Test suites
describe('<Currency.View />', () => {
  it('should render without crashing', () => {
    setup();
  });

  it('should render Control by default', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId('control')).toBeInTheDocument();
  });

  it('should not render result by default', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId('result')).not.toBeInTheDocument();
  });

  it('should render a spinner while processing data', () => {
    const props = { isProcessing: true };
    setup(props);

    expect(Spinner).toHaveBeenCalled();
  });

  it('should render alert message when error occurs while processing data', () => {
    const props = { error: 'Something went wrong!' };
    setup(props);

    expect(Alert).toHaveBeenCalled();
  });

  it('should render alert message when error occurs after processing data', () => {
    const props = {
      currencies: [
        { code: 'EUR', name: 'Euro' },
        { code: 'THB', name: 'Thai Baht' },
        { code: 'USD', name: 'United States Dollar' }
      ],
      error: 'Something went wrong!'
    };
    setup(props);

    expect(Alert).toHaveBeenCalled();
  });

  it('should render result when conversion rate and countries are available', () => {
    const props = {
      rate: '0.87892',
      countries: [
        { code: 'DE', name: 'Germany' },
        { code: 'IT', name: 'Italy' },
        { code: 'ES', name: 'Spain' }
      ]
    };
    const { queryByTestId } = setup(props);

    expect(queryByTestId('result')).toBeInTheDocument();
  });
});
