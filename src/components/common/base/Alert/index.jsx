import cx from 'classnames';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';

const propTypes = exact({
  children: PropTypes.node.isRequired,
  look: PropTypes.string,
  onDismiss: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
});

const defaultProps = {
  look: 'danger',
  onDismiss: false
};

function Alert({ children, onDismiss, look }) {
  function handleDismiss() {
    if (onDismiss) {
      onDismiss(children);
    }
  }

  return (
    <div className={cx('alert', `alert-${look}`)}>
      {children}
      <If condition={onDismiss}>
        <button
          aria-label="Close"
          className="close"
          onClick={handleDismiss}
          type="button"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </If>
    </div>
  );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
