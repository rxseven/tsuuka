import React from 'react';
import styled from 'styled-components';

import Hyperlink from 'components/common/base/Hyperlink';
import Icon from 'components/common/base/Icon';

const Logo = styled.span`
  color: rgba(255, 255, 255, 0.75);
  font-size: 1.35rem;
  transition: color 0.15s ease-in-out;

  :hover {
    color: rgba(255, 255, 255, 1);
  }
`;

function GitHub() {
  return (
    <Hyperlink href="https://github.com/rxseven/tsuuka" title="GitHub repo">
      <Logo>
        <Icon icon={['fab', 'github-alt']} />
      </Logo>
    </Hyperlink>
  );
}

export default GitHub;
