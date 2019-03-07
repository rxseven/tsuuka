import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import React from 'react';
import styled from 'styled-components';

const API_URL = 'https://www.countryflags.io';

const Flag = styled.img`
  height: 16px;
  margin-right: 0.5rem;
  width: 16px;
`;

const Item = styled.li`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
`;

const Name = styled.span`
  font-size: 0.875rem;
`;

const propTypes = exact({
  data: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
});

function Country({ data }) {
  return (
    <List>
      {data.map(country => (
        <Item key={country.code}>
          <Flag
            alt={country.name}
            src={`${API_URL}/${country.code}/flat/16.png`}
          />
          <Name>{country.name}</Name>
        </Item>
      ))}
    </List>
  );
}

Country.propTypes = propTypes;

export default Country;
