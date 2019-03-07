import React from 'react';
import { storiesOf } from '@storybook/react';

import Dropdown from './index';

const title = 'Components/Common/Modules/Currency/Dropdown';
const props = {
  data: { code: 'USD', name: 'United States Dollar' },
  query: 'THB'
};
const component = <Dropdown {...props} />;

storiesOf(title, module).add('default', () => component);
