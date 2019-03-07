import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import currencySchema from 'schemas/currency';
import Input from './index';

const title = 'Components/Common/Base/Input';
const props = { onChange: action('onChange'), ref: React.createRef() };
const validator = value => {
  if (value && value !== 'Oops!') {
    return currencySchema.isValidSync({ amount: value });
  }

  return true;
};

storiesOf(title, module)
  .addParameters({
    info: {
      text: `
  **Usage:** for more information, see [Bootstrap - Forms](https://getbootstrap.com/docs/4.1/components/forms/).
`
    }
  })
  .add('text input (default)', () => <Input {...props} />, {
    notes: {
      markdown: `As this component implements **React.forwardRef**, the story source will not show the correct data source. Furthermore, DevTool will also show a warning message addressing an invalid prop type.`
    }
  })
  .add('password', () => <Input {...props} type="password" />)
  .add('disabled', () => <Input {...props} disabled />)
  .add('with placeholder', () => <Input {...props} placeholder="Text input" />)
  .add('with value', () => <Input {...props} value="username@mail.com" />)
  .add('with validator', () => (
    <Input {...props} validator={validator} value="Invalid value" />
  ));
