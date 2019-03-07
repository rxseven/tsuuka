import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

// import Dropdown from 'components/common/modules/Currency/Dropdown';
import Combobox from './index';

const title = 'Components/Common/Composite/Combobox';
const props = {
  data: [
    { code: 'EUR', name: 'Euro' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'USD', name: 'United States Dollar' }
  ],
  display: suggestion => suggestion.name,
  dropdown: ({ data, query }) => (
    <div>
      {data.name} ({data.code})
    </div>
  ),
  id: 'combobox-001',
  input: React.forwardRef(({ onClear, value, ...inputProps }, ref) => (
    <input
      {...inputProps}
      className="form-control"
      ref={ref}
      type="text"
      value={value}
    />
  )),
  onReset: action('onReset'),
  onSelect: action('onSelect'),
  placeholder: 'Combobox'
};

storiesOf(title, module)
  .add('default', () => <Combobox {...props} />, {
    notes: 'Try with EUR, THB, or USD'
  })
  .add('initial value', () => (
    <Combobox {...props} initialValue="Initial value" />
  ))
  .add('override', () => (
    <Combobox {...props} override value="Overrided value" />
  ));
