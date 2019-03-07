import React from 'react';
import { storiesOf } from '@storybook/react';

import Country from './index';

const title = 'Components/Common/Sections/Country';
const props = {
  data: [
    { code: 'ES', name: 'Spain' },
    { code: 'IT', name: 'Italy' },
    { code: 'TH', name: 'Thailand' }
  ]
};

storiesOf(title, module).add('default', () => <Country {...props} />);
