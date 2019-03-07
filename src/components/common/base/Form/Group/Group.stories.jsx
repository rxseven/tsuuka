import React from 'react';
import { storiesOf } from '@storybook/react';

import Group from './index';

const title = 'Components/Common/Base/Form/Group';

storiesOf(title, module)
  .addParameters({
    info: {
      text: `
  **Usage:** for more information, see [Bootstrap - Groups](https://getbootstrap.com/docs/4.1/components/forms/).
`
    }
  })
  .addDecorator(story => <form>{story()}</form>)
  .add('default', () => (
    <Group>
      <label htmlFor="email">Username</label>
      <input
        className="form-control"
        id="email"
        placeholder="Your personal email address"
        type="text"
      />
    </Group>
  ));
