import React from 'react';

import { factory } from 'tests/utilities';
import Control from '../index';

// Arrange
const source = {
  baseAmount: '1',
  baseCurrency: { code: 'USD', name: 'United States Dollar' },
  baseInputRef: React.createRef(),
  currencies: [
    { code: 'EUR', name: 'Euro' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'USD', name: 'United States Dollar' }
  ],
  isProcessing: false,
  onAmount: jest.fn(),
  onExchange: jest.fn(),
  onReset: jest.fn(),
  onSelect: jest.fn(),
  override: false,
  rate: null,
  targetAmount: '',
  targetCurrency: {},
  targetInputRef: React.createRef()
};

// Setup
function setup(props) {
  return factory(Control, source, props);
}

// Test suites
describe('<Currency.Control />', () => {
  const placeholder = {
    default: 'Please choose the currency above',
    normal: 'Amount'
  };

  it('should render without crashing', () => {
    setup();
  });

  it(`should set base currency to "${
    source.baseCurrency.name
  }" by default`, () => {
    const expected = { currency: source.baseCurrency.name };
    const { getByTestId } = setup();

    expect(getByTestId('base-currency').value).toBe(expected.currency);
  });

  it(`should set base amount to "${source.baseAmount}" by default`, () => {
    const expected = { amount: source.baseAmount };
    const { getByTestId } = setup();

    expect(getByTestId('base-amount').value).toBe(expected.amount);
  });

  it('should render disabled target amount input by default', () => {
    const { getByTestId } = setup();

    expect(getByTestId('target-amount')).toBeDisabled();
  });

  it('should render enabled target amount input when rate value is not null', () => {
    const props = { rate: '31.7916' };
    const { getByTestId } = setup(props);

    expect(getByTestId('target-amount')).toBeEnabled();
  });

  it(`should render target amount input with "${
    placeholder.default
  }" placeholder by default`, () => {
    const expected = { placeholder: placeholder.default };
    const { getByTestId } = setup();

    expect(getByTestId('target-amount')).toHaveAttribute(
      'placeholder',
      expected.placeholder
    );
  });

  it(`should render target amount input with "${
    placeholder.normal
  }" placeholder when the target currency is not empty`, () => {
    const props = { targetCurrency: { code: 'THB', name: 'Thai Baht' } };
    const expected = { placeholder: placeholder.normal };
    const { getByTestId } = setup(props);

    expect(getByTestId('target-amount')).toHaveAttribute(
      'placeholder',
      expected.placeholder
    );
  });

  it('should render target amount input with empty value when rate value is null', () => {
    const props = { targetAmount: '31.7916' };
    const expected = { amount: '' };
    const { getByTestId } = setup(props);

    expect(getByTestId('target-amount').value).toBe(expected.amount);
  });

  it('should render target amount value when rate value is not null', () => {
    const props = { rate: '31.7916', targetAmount: '31.7916' };
    const expected = { amount: props.targetAmount };
    const { getByTestId } = setup(props);

    expect(getByTestId('target-amount').value).toBe(expected.amount);
  });

  it('should render flip button by default', () => {
    const { queryByTitle } = setup();

    expect(queryByTitle('Flip currency')).not.toBeNull();
  });

  it('should not render flip button when base currency is not selected', () => {
    const props = { baseCurrency: {} };
    const { queryByTitle } = setup(props);

    expect(queryByTitle('Flip currency')).toBeNull();
  });
});
