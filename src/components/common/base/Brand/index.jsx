import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled(Link)`
  color: rgba(255, 255, 255, 0.75);
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0;
  padding: 0;
  transition: color 0.2s ease-in-out;

  :hover {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
  }
`;

function Brand(props) {
  return (
    <Logo {...props} title="Currency Converter" to="/">
      通貨換算ツール
    </Logo>
  );
}

export default Brand;
