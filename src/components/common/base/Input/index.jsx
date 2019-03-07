import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  validator: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const defaultProps = {
  className: '',
  type: 'text',
  validator: null,
  value: ''
};

const Input = React.forwardRef(
  ({ className, validator, value, ...props }, ref) => {
    return (
      <input
        {...props}
        className={cx(
          'form-control',
          validator && (!validator(value) && 'is-invalid'),
          className
        )}
        ref={ref}
        value={value}
      />
    );
  }
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
