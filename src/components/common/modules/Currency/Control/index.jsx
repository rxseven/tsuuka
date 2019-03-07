import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { isEmpty } from 'lodash';
import React from 'react';
import styled from 'styled-components';

import Form from 'components/common/base/Form';
import Grid from 'components/common/base/Grid';
import Icon from 'components/common/base/Icon';
import Input from 'components/common/base/Input';
import Label from 'components/common/base/Label';
import Spinner from 'components/common/base/Spinner';
import Combobox from 'components/common/composite/Combobox';
import currencySchema from 'schemas/currency';

import Autocomplete from '../Autocomplete';
import Dropdown from '../Dropdown';

const Base = styled.fieldset`
  padding-right: 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    padding-right: 0.75rem;
  }
`;

const Exchange = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    display: block;
    margin-bottom: 0;
    width: auto;
  }
`;

const Flipper = styled(Icon)`
  color: #aaa;
  cursor: pointer;
  font-size: 1.25rem;
  justify-content: center;
  transition: color 0.2s ease-in-out;

  :hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;

const Target = styled.fieldset`
  padding-left: 0;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    padding-left: 0.75rem;
  }
`;

const Toolbar = styled.div`
  align-items: center;
  display: flex;
  height: 22px;
  justify-content: center;
  width: 25px;

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    left: 50%;
    margin-left: -12.5px;
    position: absolute;
    top: 72px;
    z-index: 1;
  }
`;

// Get suggestion value
// When user navigates the suggestions using the Up and Down keys,
// the input value should be set according to the highlighted suggestion
function getSuggestionValue(suggestion) {
  return suggestion.name;
}

const propTypes = exact({
  baseAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  baseCurrency: PropTypes.oneOfType([
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    PropTypes.shape({}).isRequired
  ]).isRequired,
  baseInputRef: PropTypes.instanceOf(Object).isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  isProcessing: PropTypes.bool,
  onAmount: PropTypes.func.isRequired,
  onExchange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  override: PropTypes.bool,
  rate: PropTypes.string,
  targetAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  targetCurrency: PropTypes.oneOfType([
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    PropTypes.shape({}).isRequired
  ]).isRequired,
  targetInputRef: PropTypes.instanceOf(Object).isRequired
});

const defaultProps = {
  isProcessing: false,
  override: false,
  rate: null
};

function Control(props) {
  const {
    baseAmount,
    baseCurrency,
    baseInputRef,
    currencies,
    isProcessing,
    onAmount,
    onExchange,
    onReset,
    onSelect,
    override,
    rate,
    targetAmount,
    targetCurrency,
    targetInputRef
  } = props;
  const isReady = !isEmpty(baseCurrency) || !isEmpty(targetCurrency);

  const comboboxProps = {
    data: currencies,
    display: getSuggestionValue,
    dropdown: Dropdown,
    input: Autocomplete,
    override,
    placeholder: 'Enter currency'
  };

  const inputProps = {
    validator: value => {
      if (value && value !== 'Oops!') {
        return currencySchema.isValidSync({ amount: value });
      }

      return true;
    }
  };

  let targetInputlaceholder;

  switch (true) {
    case !isEmpty(targetCurrency) && !isProcessing:
      targetInputlaceholder = 'Amount';
      break;
    case isProcessing:
      targetInputlaceholder = 'Processing...';
      break;
    default:
      targetInputlaceholder = 'Please choose the currency above';
  }

  function handleChangeBase(event) {
    onAmount({ value: event.target.value });
  }

  function handleChangeTarget(event) {
    onAmount({ direction: 'backward', value: event.target.value });
  }

  function handleResetBase() {
    onReset('baseCurrency');
  }

  function handleResetTarget() {
    onReset('targetCurrency');
  }

  function handleSelectBase(value) {
    onSelect({ key: 'baseCurrency', value });
  }

  function handleSelectTarget(value) {
    onSelect({ key: 'targetCurrency', value });
  }

  return (
    <Grid.Row>
      <Grid.Column size="col-md-6">
        <Base>
          <Form.Group>
            <Label htmlFor="combobox-from" small>
              Currency I have
            </Label>
            <Combobox
              {...comboboxProps}
              id="combobox-base"
              initialValue="United States Dollar"
              onReset={handleResetBase}
              onSelect={handleSelectBase}
              value={baseCurrency.name}
            />
          </Form.Group>
          <Form.Group>
            <Label htmlFor="input-base" small>
              I have this much to exchange
            </Label>
            <Input
              {...inputProps}
              name="input-base"
              onChange={handleChangeBase}
              placeholder="Amount"
              ref={baseInputRef}
              value={baseAmount}
            />
          </Form.Group>
        </Base>
      </Grid.Column>
      <Exchange>
        <Toolbar>
          <Choose>
            <When condition={isProcessing}>
              <Spinner circle />
            </When>
            <Otherwise>
              <If condition={isReady}>
                <Flipper
                  icon="retweet"
                  onClick={onExchange}
                  title="Flip currency"
                />
              </If>
            </Otherwise>
          </Choose>
        </Toolbar>
      </Exchange>
      <Grid.Column size="col-md-6">
        <Target>
          <Form.Group>
            <Label htmlFor="combobox-to" small>
              Currency I want
            </Label>
            <Combobox
              {...comboboxProps}
              id="combobox-target"
              onReset={handleResetTarget}
              onSelect={handleSelectTarget}
              value={targetCurrency.name}
            />
          </Form.Group>
          <Form.Group>
            <Label htmlFor="input-target" small>
              I want to buy something at this price
            </Label>
            <Input
              {...inputProps}
              disabled={!rate}
              name="input-target"
              onChange={handleChangeTarget}
              placeholder={targetInputlaceholder}
              ref={targetInputRef}
              value={rate ? targetAmount : ''}
            />
          </Form.Group>
        </Target>
      </Grid.Column>
    </Grid.Row>
  );
}

Control.propTypes = propTypes;
Control.defaultProps = defaultProps;

export default Control;
