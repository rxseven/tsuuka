import React from 'react';
import styled from 'styled-components';

import Alert from 'components/common/base/Alert';
import Spinner from 'components/common/base/Spinner';
import Control from '../Control';
import Result from '../Result';

const Content = styled.div`
  margin-bottom: 1rem;
  position: relative;
  width: 570px;
`;

const Frame = styled.div`
  display: flex;
  justify-content: center;
`;

const Indicator = styled.div`
  text-align: center;
`;

function View(props) {
  const {
    baseAmount,
    baseCurrency,
    baseInputRef,
    countries,
    currencies,
    error,
    isLoading,
    isProcessing,
    onAmount,
    onExchange,
    onReset,
    onSelect,
    override,
    rate,
    targetAmount,
    targetCurrency,
    targetInputRef,
    timestamp
  } = props;

  const commonProps = {
    baseCurrency,
    targetCurrency
  };

  const controlProps = {
    ...commonProps,
    baseAmount,
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
    targetInputRef
  };

  const resultProps = {
    ...commonProps,
    countries,
    rate,
    timestamp
  };

  const isError = !!error;

  return (
    <Frame>
      <Content>
        <Choose>
          <When condition={isLoading}>
            <Indicator>
              <Spinner />
            </Indicator>
          </When>
          <When condition={isError && !currencies && !isLoading}>
            <Alert>{error}</Alert>
          </When>
          <Otherwise>
            <Control {...controlProps} />
            <Choose>
              <When condition={isError && currencies && !isLoading}>
                <Alert>{error}</Alert>
              </When>
              <When condition={!isProcessing && rate}>
                <Result {...resultProps} />
              </When>
            </Choose>
          </Otherwise>
        </Choose>
      </Content>
    </Frame>
  );
}

export default View;
