import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';

import Group from './Group';

const propTypes = exact({
  children: PropTypes.node.isRequired,
  className: PropTypes.string
});

const defaultProps = {
  className: ''
};

function Form({ children, className }) {
  return <form className={className}>{children}</form>;
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

Form.Group = Group;

export default Form;
