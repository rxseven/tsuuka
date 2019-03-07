import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';
import { FadingCircle, ThreeBounce } from 'better-react-spinkit';

const propTypes = exact({
  circle: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.number
});

const defaultProps = {
  circle: false,
  color: '#999',
  size: 7
};

const options = {
  duration: '1.25s',
  gutter: 5
};

function Spinner({ circle, ...props }) {
  if (circle) {
    return <FadingCircle />;
  }

  return <ThreeBounce {...options} {...props} />;
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
