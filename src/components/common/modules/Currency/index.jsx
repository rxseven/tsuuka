import { isEmpty } from 'lodash';
import React from 'react';

import withContext from 'HOCs/withContext';
import { formatNumber } from 'helpers/number';
import currencySchema from 'schemas/currency';
import * as currencyService from 'services/currency';
import View from './View';

const STATE = {
  ajax: {
    error: null,
    isConverting: false,
    isFetching: false
  },
  data: {
    baseAmount: 1,
    baseCurrency: { code: 'USD', name: 'United States Dollar' },
    countries: [],
    override: false,
    rate: null,
    targetAmount: 0,
    targetCurrency: {},
    timestamp: null
  }
};

class Currency extends React.Component {
  state = {
    ...STATE.ajax,
    ...STATE.data
  };

  isMounting = false;

  baseInput = React.createRef();

  targetInput = React.createRef();

  componentDidMount() {
    const { context } = this.props;
    const { currencies } = context.state;
    const currenciesLength = currencies.length;

    // Update mounting state
    this.isMounting = true;

    // Fetch currencies if the list is empty
    if (currenciesLength < 1) {
      this.fetchCurrencies();
    }
  }

  componentWillUnmount() {
    // Reset mounting state
    this.isMounting = false;
  }

  // Update state helper
  updateState = (updater, callback = null) => {
    if (this.isMounting) {
      this.setState(updater, callback);
    }
  };

  // Fetch currencies
  fetchCurrencies = () => {
    const request = null;

    const successHandler = response => {
      // Retrieve data in a response and transform to an appropriate format
      const { data } = response;

      // Update state and status message once the HTTP request finished
      this.handleAjaxSuccess({ data });
    };

    const errorHandler = error => {
      // Handle failure HTTP request
      this.handleAjaxError({ error });
    };

    // Update state and status message once the HTTP request starts
    this.handleAjaxStart({
      state: { isFetching: true },
      scope: 'global'
    });

    // Fetch currencies
    currencyService.fetchcurrencies(request, successHandler, errorHandler);
  };

  // Fetch conversion rate
  fetchRate = params => {
    const request = params;

    const successHandler = response => {
      // Retrieve data in a response and transform to an appropriate format
      const { data } = response;

      // Update state and status message once the HTTP request finished
      this.handleAjaxSuccess({
        callback: () => {
          const { baseAmount, baseCurrency, targetCurrency } = this.state;

          // Calculate exchange amount
          if (!isEmpty(baseCurrency) && !isEmpty(targetCurrency)) {
            this.calculateAmount(baseAmount);
          }
        },
        state: data
      });
    };

    const errorHandler = error => {
      // Handle failure HTTP request
      this.handleAjaxError({ error });
    };

    // Update state and status message once the HTTP request starts
    this.handleAjaxStart({
      state: { isConverting: true }
    });

    // Fetch currencies
    currencyService.fetchRate(request, successHandler, errorHandler);
  };

  // Validate amount
  validateAmount = (value, key, state) => {
    const { rate } = this.state;

    if (rate) {
      currencySchema.isValid({ amount: value }).then(valid => {
        this.setState({
          [key]: valid ? state : 'Oops!'
        });
      });
    }
  };

  // Calculate conversion rate
  calculateRate = () => {
    const { baseCurrency, targetCurrency } = this.state;

    if (!isEmpty(baseCurrency) && !isEmpty(targetCurrency)) {
      this.fetchRate({ from: baseCurrency.code, to: targetCurrency.code });
    }
  };

  // Calculate exchange amount
  calculateAmount = (value, forward = true) => {
    const { rate } = this.state;
    let equation = value * rate;
    let key = 'targetAmount';

    if (!forward) {
      equation = value / rate;
      key = 'baseAmount';
    }

    // Validate input value before updating state
    this.validateAmount(value, key, formatNumber(equation));
  };

  // Handle failure Ajax request
  handleAjaxError = ({ callback = null, error }) => {
    // Retrieve error in a response and transform to an appropriate format
    const {
      data: { message }
    } = error.response;

    // Show alert message
    this.updateState({ ...STATE.ajax, error: message }, callback);
  };

  // Handle Ajax start
  handleAjaxStart = ({ state = null }) => {
    this.updateState({
      ...STATE.ajax,
      ...state
    });
  };

  // Handle successful Ajax request
  handleAjaxSuccess = ({ callback = null, data = null, state = {} }) => {
    const { context } = this.props;

    // Update context state
    if (this.isMounting && data) {
      context.actions.currency.onChange({ currencies: data });
    }

    this.updateState(
      {
        ...STATE.ajax,
        ...state
      },
      callback
    );
  };

  // Handle currency selection
  handleSelect = ({ key, value }) => {
    this.setState({ [key]: value }, () => {
      this.calculateRate();
    });
  };

  // Handle amount change
  handleAmountChange = ({ direction = 'forward', value }) => {
    if (direction === 'forward') {
      this.setState({ baseAmount: value }, () => this.calculateAmount(value));
    } else {
      this.setState({ targetAmount: value }, () =>
        this.calculateAmount(value, false)
      );
    }
  };

  // Reset conversion rate
  handleResetConversion = field => {
    const { rate, [field]: currency } = this.state;

    // Clear currency field
    if (!isEmpty(currency)) {
      this.setState({ [field]: {} });
    }

    // Clear the rest
    if (rate) {
      this.setState({
        countries: [],
        rate: null,
        timestamp: null,
        targetAmount: 0
      });
    }
  };

  // Flip currency
  handleExchange = () => {
    // Arrange exchange data
    const { baseCurrency, targetAmount, targetCurrency } = this.state;
    const clipboard = {
      ...STATE.data,
      baseAmount: currencySchema.isValidSync({ amount: targetAmount })
        ? targetAmount
        : 1,
      baseCurrency: targetCurrency,
      targetCurrency: baseCurrency,
      override: true
    };

    // Update state and fetch a conversion rate
    this.setState(clipboard, () => {
      this.setState({ override: false });
      this.calculateRate();
    });
  };

  render() {
    const { context } = this.props;
    const { isConverting, isFetching, rate, ...restState } = this.state;
    const { state } = context;

    const props = {
      ...restState,
      baseInputRef: this.baseInput,
      currencies: state.currencies,
      isLoading: isFetching,
      isProcessing: isConverting,
      onAmount: this.handleAmountChange,
      onExchange: this.handleExchange,
      onReset: this.handleResetConversion,
      onSelect: this.handleSelect,
      rate: rate ? formatNumber(parseFloat(rate)) : rate,
      targetInputRef: this.targetInput
    };

    return <View {...props} />;
  }
}

export default withContext(Currency);
