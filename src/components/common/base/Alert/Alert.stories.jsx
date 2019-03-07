import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Alert from './index';

const title = 'Components/Common/Base/Alert';
const props = { children: 'Alert message' };

storiesOf(title, module)
  .addParameters({
    info: {
      text: `
  **Usage:** for more information, see [Bootstrap - Alerts](https://getbootstrap.com/docs/4.1/components/alerts/).
`
    }
  })
  .add('danger (default)', () => <Alert {...props} />)
  .add('with dismiss', () => (
    <Alert {...props} onDismiss={action('onDismiss')} />
  ))
  .add('look', () => <Alert {...props} look="success" />);
