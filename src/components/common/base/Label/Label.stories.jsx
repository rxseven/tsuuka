import React from 'react';
import { storiesOf } from '@storybook/react';

import Label from './index';

const title = 'Components/Common/Base/Label';
const props = { children: 'Form label', htmlFor: 'username' };

storiesOf(title, module)
  .addParameters({
    info: {
      text: `
  **Usage:** for more information, see [Bootstrap - Forms](https://getbootstrap.com/docs/4.1/components/forms/).
`
    }
  })
  .add('default', () => <Label {...props} />)
  .add('small', () => <Label {...props} small />);
