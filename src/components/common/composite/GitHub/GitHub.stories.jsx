import React from 'react';
import { storiesOf } from '@storybook/react';

import GitHub from './index';

const title = 'Components/Common/Composite/GitHub';
const component = <GitHub />;

storiesOf(title, module).add('default', () => component, {
  notes: 'Default icon color is white, please use it with dark background.'
});
