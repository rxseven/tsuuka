import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

import Hyperlink from 'components/common/base/Hyperlink';
import Country from 'components/common/sections/Country';

const Highlight = styled.i`
  color: ${({ theme }) => theme.color.primary};
  font-style: normal;
`;

const Meta = styled.div`
  border-top: #beabda solid 1px;
  color: ${({ theme }) => theme.color.secondary};
  font-size: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
`;

const propTypes = exact({
  baseCurrency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  rate: PropTypes.string.isRequired,
  targetCurrency: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  timestamp: PropTypes.number.isRequired
});

function Result(props) {
  const { baseCurrency, countries, rate, targetCurrency, timestamp } = props;
  const countriesLength = countries.length;

  return (
    <div data-testid="result">
      <p>
        <Highlight>1 {baseCurrency.code}</Highlight> is worth{' '}
        <Highlight>
          {rate} {targetCurrency.code}
        </Highlight>
        . You can spend it{' '}
        {countriesLength > 1
          ? `in the
    following ${countriesLength} countries`
          : 'only in'}
        :
      </p>
      <Country data={countries} />
      <Meta>
        Last updated{' '}
        <Hyperlink href="https://fixer.io" title="Fixer.io">
          foreign exchange rates
        </Hyperlink>{' '}
        at{' '}
        <strong data-testid="latest-date">
          {moment.unix(timestamp).format('HH:mm:ss')}
        </strong>{' '}
        on{' '}
        <strong data-testid="latest-time">
          {moment.unix(timestamp).format('DD.MM.YYYY')}
        </strong>{' '}
        (free plan,{' '}
        <Hyperlink
          href="https://fixer.io/product"
          title="Fixer's Plans & Pricing"
        >
          hourly updates
        </Hyperlink>
        ).
      </Meta>
    </div>
  );
}

Result.propTypes = propTypes;

export default Result;
