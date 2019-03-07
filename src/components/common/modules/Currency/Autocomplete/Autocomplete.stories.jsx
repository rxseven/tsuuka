import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Autocomplete from './index';

const title = 'Components/Common/Modules/Currency/Autocomplete';
const props = {
  onChange: action('onChange'),
  onClear: action('onClear'),
  value: 'United States Dollar'
};
const component = <Autocomplete {...props} />;

storiesOf(title, module).add('default', () => component, {
  notes: {
    markdown: `As this component implements **React.forwardRef**, the story source will not show the correct data source. Furthermore, DevTool will also show a warning message addressing an invalid prop type.`
  }
});
