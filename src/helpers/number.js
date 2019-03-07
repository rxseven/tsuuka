/* eslint-disable import/prefer-default-export */

// Format a number using fixed-point notation
function formatNumber(value, digits = 5) {
  return value.toFixed(digits);
}

export { formatNumber };
