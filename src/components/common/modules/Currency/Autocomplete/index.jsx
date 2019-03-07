import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Icon from 'components/common/base/Icon';

const Frame = styled.div`
  position: relative;
`;

const Clear = styled(Icon)`
  color: ${({ theme }) => theme.color.secondary};
  cursor: pointer;
  display: none;
  position: absolute;
  right: 0.75rem;
  top: 10px;

  :hover {
    color: ${({ theme }) => theme.color.primary};
  }

  /* stylelint-disable-next-line */
  ${Frame}:hover & {
    display: ${({ visibility }) => (visibility ? 'block' : 'none')};
  }
`;

const propTypes = {
  onClear: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

const Autocomplete = React.forwardRef(({ onClear, value, ...props }, ref) => {
  return (
    <Frame>
      <input
        {...props}
        className="form-control"
        ref={ref}
        type="text"
        value={value}
      />
      <Clear icon="times-circle" onClick={onClear} visibility={value} />
    </Frame>
  );
});

Autocomplete.propTypes = propTypes;

export default Autocomplete;
