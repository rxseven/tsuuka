import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';
import styled from 'styled-components';

import { genKey } from 'helpers/string';

const Code = styled.span`
  text-align: left;
  width: 2rem;
`;

const Item = styled.span`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.span`
  display: inline-block;
`;

const Text = styled.span`
  color: ${({ theme, ...props }) =>
    props['data-highlight'] ? theme.color.primary : theme.color.base};
`;

const propTypes = exact({
  data: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  query: PropTypes.string.isRequired
});

function Dropdown({ data, query }) {
  const matches = match(data.name, query);
  const parts = parse(data.name, matches);
  const name = (
    <Name>
      {parts.map(part => {
        return (
          <Text
            data-highlight={part.highlight}
            key={`${genKey()}-${part.text}`}
          >
            {part.text}
          </Text>
        );
      })}
    </Name>
  );

  return (
    <Item>
      {name} <Code>{data.code}</Code>
    </Item>
  );
}

Dropdown.propTypes = propTypes;

export default Dropdown;
