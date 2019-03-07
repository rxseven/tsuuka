import React from 'react';
import { storiesOf } from '@storybook/react';

import Form from './index';

const title = 'Components/Common/Base/Form';

storiesOf(title, module)
  .addParameters({
    info: {
      text: `
  **Usage:** for more information, see [Bootstrap - Forms](https://getbootstrap.com/docs/4.1/components/forms/).
`
    }
  })
  .add('default', () => (
    <Form>
      <input className="form-control" placeholder="Text input" type="text" />
    </Form>
  ));
