import React from 'react';
import { storiesOf } from '@storybook/react';

import Footer from './index';

const title = 'Components/Common/Base/Card/Footer';
const component = <Footer>Card Footer</Footer>;

storiesOf(title, module).add('default', () => component);
