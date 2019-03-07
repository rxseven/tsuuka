import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';
import styled from 'styled-components';

const Tag = styled.label`
  color: ${({ small, theme }) =>
    small ? theme.color.secondary : theme.color.base};
  font-size: ${({ small }) => (small ? '0.75rem' : 'inherit')};
  margin-bottom: ${({ small }) => (small ? '0.35rem' : 'inherit')};
`;

const propTypes = exact({
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  small: PropTypes.bool
});

const defaultProps = {
  className: '',
  small: false
};

function Label({ children, ...props }) {
  return <Tag {...props}>{children}</Tag>;
}

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;
