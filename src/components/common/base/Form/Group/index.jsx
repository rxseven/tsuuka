import cx from 'classnames';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';

const propTypes = exact({
  children: PropTypes.node.isRequired,
  className: PropTypes.string
});

const defaultProps = {
  className: ''
};

function Group({ children, className }) {
  return <div className={cx('form-group', className)}>{children}</div>;
}

Group.propTypes = propTypes;
Group.defaultProps = defaultProps;

export default Group;
